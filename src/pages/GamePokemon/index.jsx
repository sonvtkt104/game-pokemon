import React, { useEffect, useState } from "react";
import './css/index.css';
import { infoPokemon } from "./data";

const widthMap = 16 // + 2 (Outline)
const heightMap = 9 // + 2 (Outline)

export default function GamePokemon() {
    const [listPokemon, setListPokemon] = useState([[]]) // [x][y] = infoPokemon
    

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

        console.log('listPokemon', arr)
        setListPokemon(arr)
    }, [])

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns:  `repeat(${widthMap + 2}, 1fr)`,
                gridTemplateRows: `repeat(${heightMap + 2}, 1fr)`,
                gap: "1px",
                height: "100%",
                width: "100%",
            }}
        >
            {
                listPokemon?.map((col, x) => {
                    return col.map((pokemon, y) => (
                        <span
                            style={{
                                gridColumnStart: x + 1,
                                gridRowStart: y + 1,
                                textAlign: "center",
                                border: '1px solid'
                            }}      
                        >
                            {pokemon?.value}
                        </span>
                    ))
                })
            }
        </div>
    )
}