import React, { useCallback, useEffect, useState } from "react";
import './css/index.css';
import { infoPokemon } from "./data";

const widthMap = 16 // + 2 (Outline)
const heightMap = 9 // + 2 (Outline)
const widthSquarePokemon = 50

export default function GamePokemon() {
    const [listPokemon, setListPokemon] = useState([[]]) // [x][y] = infoPokemon
    const [pokemonChoose, setPokemonChoose] = useState(null) // {...pokemon, x, y}
    const [score, setScore] = useState(0)

    console.log({
        listPokemon,
        pokemonChoose
    })

    useEffect(() => {
        let arr = []
        for(let i = 0; i < widthMap + 2; i++) {
            arr[i] = []
        }
    
        let number = 0
        let indexPokemon = 0
        let arrPokemon = [];
        while (arrPokemon.length < (widthMap * heightMap)) {
            if(number == 2) {
                number = 0
                indexPokemon ++
            }

            if(!infoPokemon[indexPokemon]) {
                indexPokemon = 0
            }

            if(infoPokemon[indexPokemon]) {
                arrPokemon.push(infoPokemon[indexPokemon])
                number = number + 1
            }
        }

        // shuffle
        arrPokemon = arrPokemon?.sort(() => Math.random() - 0.5)
      
        let i = 0
        for(let x = 1; x <= widthMap; x++) {
            for(let y = 1; y <= heightMap; y++) {
                arr[x][y] = arrPokemon[i]
                i++
            }
        }

        setListPokemon(arr)
    }, [])

    const handleAfterCheck = useCallback((resultCheck, pokemon1, pokemon2) => {
        if(resultCheck) {
            let arr = JSON.parse(JSON.stringify(listPokemon))
            arr[pokemon1.x][pokemon1.y] = null
            arr[pokemon2.x][pokemon2.y] = null
            setListPokemon(arr)
            setPokemonChoose(null)
            setScore(pre => pre + 10)
        } else {
            setPokemonChoose(null)
        }
    }, [listPokemon])

    const checkWithLine = useCallback((pokemon1, pokemon2) => { // {..., x, y}
        let bigger, smaller
        let check = true;
        if(pokemon1.x == pokemon2.x) {
            if(pokemon1.y > pokemon2.y) {
                bigger = pokemon1.y
                smaller = pokemon2.y
            } else {
                bigger = pokemon2.y
                smaller = pokemon1.y
            }
            for(let i = smaller + 1; i < bigger; i++) {
                if(listPokemon[pokemon1.x][i]) {
                    check = false
                    break;
                }
            }
            return check
        } else if(pokemon1.y == pokemon2.y) {
            if(pokemon1.x > pokemon2.x) {
                bigger = pokemon1.x
                smaller = pokemon2.x
            } else {
                bigger = pokemon2.x
                smaller = pokemon1.x
            }
            for(let i = smaller + 1; i < bigger; i++) {
                if(listPokemon[i][pokemon1.y]) {
                    check = false
                    break;
                }
            }
            return check
        } else return false;
    }, [listPokemon]) 

    const checkWithPathL = useCallback((pokemon1, pokemon2) => { // {..., x, y}
        if(pokemon1.x == pokemon2.x || pokemon1.y == pokemon2.y) {
            return checkWithLine(pokemon1, pokemon2)
        } else {
            let pokemonCorner1 = listPokemon[pokemon1.x][pokemon2.y]
            let pokemonCorner2 = listPokemon[pokemon2.x][pokemon1.y]
            if(!pokemonCorner1 && checkWithLine(pokemon1, {x : pokemon1.x, y: pokemon2.y}) && checkWithLine({x : pokemon1.x, y: pokemon2.y}, pokemon2)) {
                return true
            } else {
                return !pokemonCorner2 && checkWithLine(pokemon1, {x : pokemon2.x, y: pokemon1.y}) && checkWithLine({x : pokemon2.x, y: pokemon1.y}, pokemon2)
            }
        }
    }, [checkWithLine, listPokemon])  

    const handleCheckChoosePokemon = useCallback((pokemon2) => { // {...pokemon, x, y}
        // check value
        if(pokemonChoose.value != pokemon2.value) {
            handleAfterCheck(false)
            return;
        }

        // check path
        // check with line
        if(pokemonChoose.x == pokemon2.x || pokemonChoose.y == pokemon2.y) {
            if(checkWithLine(pokemonChoose, pokemon2)) {
                handleAfterCheck(true, pokemonChoose, pokemon2)
                return
            } 
        } 

        // check path L
        if(checkWithPathL(pokemonChoose, pokemon2)) {
            handleAfterCheck(true, pokemonChoose, pokemon2)
            return
        }

        // direction above
        for(let y = pokemonChoose.y - 1; y >= 0; y --) {
            if(listPokemon[pokemonChoose.x][y]) {
                break;
            } else {
                if(checkWithPathL({x: pokemonChoose.x, y: y}, pokemon2)) {
                    handleAfterCheck(true, pokemonChoose, pokemon2)
                    return
                }
            }
        }

        // direction bottom 
        for(let y = pokemonChoose.y + 1; y < heightMap + 2; y ++) {
            if(listPokemon[pokemonChoose.x][y]) {
                break;
            } else {
                if(checkWithPathL({x: pokemonChoose.x, y: y}, pokemon2)) {
                    handleAfterCheck(true, pokemonChoose, pokemon2)
                    return
                }
            }
        }
        
        // direction left
        for(let x = pokemonChoose.x - 1; x >= 0; x --) {
            if(listPokemon[x][pokemonChoose.y]) {
                break;
            } else {
                if(checkWithPathL({x: x, y: pokemonChoose.y}, pokemon2)) {
                    handleAfterCheck(true, pokemonChoose, pokemon2)
                    return
                }
            }
        }

        // direction right
        for(let x = pokemonChoose.x + 1; x < widthMap + 2; x ++) {
            if(listPokemon[x][pokemonChoose.y]) {
                break;
            } else {
                if(checkWithPathL({x: x, y: pokemonChoose.y}, pokemon2)) {
                    handleAfterCheck(true, pokemonChoose, pokemon2)
                    return
                }
            }
        }

        // return default
        handleAfterCheck(false)
        return
    }, [pokemonChoose, listPokemon, checkWithLine, handleAfterCheck, checkWithPathL])

    const handleShuffle = useCallback(() => {
        let arr = []
        let listPokemonCurrent = JSON.parse(JSON.stringify(listPokemon))
        listPokemonCurrent?.forEach(colPokemon => {
            colPokemon?.forEach(pokemon => {
                if(pokemon) arr.push(pokemon)
            })
        })

        // shuffle
        arr = arr?.sort(() => Math.random() - 0.5)

        let i = 0
        for(let x = 1; x <= widthMap; x++) {
            for(let y = 1; y <= heightMap; y++) {
                if(listPokemonCurrent[x][y]) {
                    listPokemonCurrent[x][y] = arr[i]
                    i++
                }
            }
        }

        setListPokemon(listPokemonCurrent)
    }, [listPokemon])

    return (
        <div>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:  `repeat(${widthMap + 2}, 1fr)`,
                    gridTemplateRows: `repeat(${heightMap + 2}, 1fr)`,
                    gap: "1px",
                    width: widthSquarePokemon * (widthMap + 2) + (widthMap - 1) + widthMap * 2
                }}
            >
                {
                    listPokemon?.map((col, x) => {
                        return col.map((pokemon, y) => {
                            if(listPokemon[x][y]) {
                                return (
                                    <div
                                        className={`item-pokemon ${pokemonChoose?.x == x && pokemonChoose?.y == y ? 'active' : ''}`}
                                        style={{
                                            gridColumnStart: x + 1,
                                            gridRowStart: y + 1,
                                            width: widthSquarePokemon,
                                            height: widthSquarePokemon,
                                        }} 
                                        onClick={() => {
                                            if(pokemonChoose) {
                                                if(JSON.stringify(pokemonChoose) == JSON.stringify({...pokemon, x, y})) {
                                                    setPokemonChoose(null)
                                                } else {
                                                    handleCheckChoosePokemon({...pokemon, x, y})
                                                }
                                            } else {
                                                setPokemonChoose({
                                                    ...pokemon,
                                                    x : x,
                                                    y : y,
                                                })
                                            }
                                        }}
                                    >
                                        <img src={pokemon.image} alt="pokemon"  
                                            style={{
                                                position: 'absolute',
                                                inset: 0,
                                                width: '100%',
                                                height: '100%',
                                            }}
                                        />
                                    </div>
                                )
                            } else return ''
                        })
                    })
                }
            </div>
            <div
                style={{cursor: 'pointer'}}
                onClick={() => {
                    handleShuffle()
                }}
            >
                shuffle
            </div>
            <div>
                Score: {score}
            </div>
        </div>
    )
}