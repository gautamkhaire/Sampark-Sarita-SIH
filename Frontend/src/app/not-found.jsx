import Image from "next/image";
import Error_Page from "../assets/Images/404_Error_Page.png"
export default function NotFound(){
    return (
        <div className="flex flex-col justify-center items-center">
            <Image
                src={Error_Page}
                alt="404 Error Page"
                width={500}
                height={500}
            />
            <p className="w-1/2 -mt-12 text-xl text-center font-semibold tracking-tight text-gray-900"><span className="text-rose-600">Oops!</span> It looks like you've ventured into uncharted territory. Our cyber-mappers are on the case, trying to locate the missing page. In the meantime, feel free to explore the rest of our digital realm or embark on a quest to find the elusive content. If you're feeling adventurous, you can try checking your coordinates (URL) or use the navigation map to reach a known destination.<br/> <span className="text-green-500">Happy exploring, and may your internet adventures be glitch-free!</span></p>
        </div>
    )
}