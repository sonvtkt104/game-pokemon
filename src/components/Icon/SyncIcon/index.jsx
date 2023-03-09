export function SyncIcon({ color }) {
    return (
        <svg
            width={19}
            height={18}
            viewBox="0 0 19 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M18.2284 6.92686C18.2284 7.41493 17.8358 7.80759 17.3477 7.80759H13.2376H12.0633C11.5752 7.80759 11.1826 7.41493 11.1826 6.92686C11.1826 6.43878 11.5752 6.04612 12.0633 6.04612H13.2376H15.2229L13.311 4.1342C12.2762 3.103 10.878 2.52319 9.42111 2.52319C6.75322 2.52319 4.45964 4.14154 3.47616 6.45346C3.28533 6.90117 2.7679 7.11034 2.32019 6.91952C1.87249 6.72869 1.66331 6.21126 1.85414 5.76355C3.10551 2.8241 6.02294 0.761719 9.42111 0.761719C11.3477 0.761719 13.1936 1.52502 14.5551 2.88649L16.467 4.80209V2.81676V2.80209V1.64245C16.467 1.15438 16.8596 0.761719 17.3477 0.761719C17.8358 0.761719 18.2284 1.15438 18.2284 1.64245V6.92686ZM1.4945 10.1562H5.6046C6.09267 10.1562 6.48533 10.5489 6.48533 11.0369C6.48533 11.525 6.09267 11.9177 5.6046 11.9177H3.61927L5.5312 13.8296C6.56606 14.8608 7.96423 15.4406 9.42111 15.4406C12.0853 15.4406 14.3752 13.8296 15.3624 11.5214C15.5532 11.0736 16.0707 10.8681 16.5184 11.059C16.9661 11.2498 17.1716 11.7672 16.9807 12.2149C15.7257 15.147 12.8156 17.2021 9.42111 17.2021C7.4945 17.2021 5.64863 16.4388 4.28716 15.0773L2.37524 13.1617V15.147C2.37524 15.6351 1.98258 16.0278 1.4945 16.0278C1.00643 16.0278 0.61377 15.6351 0.61377 15.147V11.0369C0.61377 10.5489 1.00643 10.1562 1.4945 10.1562Z"
                fill={color || "#96A2BA"}
            />
        </svg>
    );
}
