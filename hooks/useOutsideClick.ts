import { useEffect, useRef } from "react";

{/**<T extends HTMLElement> → un peu de TypeScript : ça veut dire que ref pointera vers un élément HTML (par ex. div, button, input, etc.). */}
export function useOutsideClick<T extends HTMLElement >
(callback:()=>void){
    const ref=useRef<T>(null);
    useEffect(()=>{
        const handleClickOutside=(e:MouseEvent)=>{
            if(ref.current && !ref.current.contains(e.target as Node)){
                callback();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)};
    },[callback]);
    return ref;
}

{/**e.target:element sur lequel on clique
    ref.current: element du dom qu'on surveille
     */}