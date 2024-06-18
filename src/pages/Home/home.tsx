import home from "@/assets/home2.png"
import { ModeToggle } from "@/components/mode-toggle";
import tumor from "@/assets/tumor2.png"
import { TypeAnimation } from 'react-type-animation';
import { Slider } from "@/components/slider";
export default function Home() {
    return (
        <div className="flex flex-col justify-between">
            <div className=" flex flew-row justify-between w-full p-8 sticky">
                <h1 className="text-2xl dark:text-white text-black">Logo</h1>
                <div className="flex flex-row justify-center gap-5 ">
                    <ul className="flex space-x-8 p-2">

                        <li>
                            <a href="#services" className="dark:text-white text-black dark:hover:text-gray-300 dhover:text-gray-800">Services</a>
                        </li>
                        <li>
                            <a href="#" className="dark:text-white text-black  dark:hover:text-gray-300 hover:text-gray-800">Documentation</a>
                        </li>
                    </ul>
                    <ModeToggle />
                </div>

            </div>
            <div className="flex sm:flex-row flex-col justify-center items-center w-full mx-auto lg:pb-20  ">
                <div className="flex w-1/2 flex-col sm:order-1 order-2">
                    <h1 className="scroll-m-20  text-2xl font-extrabold tracking-tight lg:text-3xl ">
                        Empowering Vision: Seamless Image Segmentation Solutions
                    </h1>
                    <div className="flex w-3/4 py-3">Experience effortless precision in image segmentation.
                        Our platform simplifies boundary delineation for clear, professional results.</div>
                    <div className="flex  justify-center py-2 bg-[#450EA7] rounded-md lg:w-3/12 md:w-2/5 w-3/5  hover:bg-[#450EA7]/95">
                        <a href="/model" className="text-white  lg:text-md text-base">
                            Get Started
                        </a>
                    </div>
                </div>
                <div className="sm:w-5/12 w-6/12 p-6 order-1 sm:order-2">
                    <img src={home} />
                </div>

            </div>



            <div id="services" className="flex flex-row items-center justify-center py-2 " >

                <div className=" sm:w-5/12 w-1/2 w h-full px-8">
                    <h1 className="scroll-m-20  text-2xl font-extrabold tracking-tight lg:text-3xl mb-6">Introducing our easy-to-use satellite image segmentation tool:</h1>
                    <TypeAnimation
                        sequence={[
                            'With just a few clicks, users can divide complex satellite images into distinct section making analysis straightforward and efficient. Say goodbye to complexity and hello to actionable insights with our user-friendly interface.',
                            1000,
                        ]}
                        wrapper="span"
                        speed={50}
                        style={{ fontSize: '1em', display: 'inline-block' }}
                        repeat={Infinity}
                    />
                </div>
                <div className="sm:w-1/2 w-1/2 h-full ">
                    <Slider />
                </div>


            </div>


            <div className="flex flex-row items-center justify-center py-2 ">
                <div className="sm:w-1/2 w-1/2 h-full ">
                    <img src={tumor} className="flex justify-center" />
                </div>
                <div className=" sm:w-5/12 w-1/2 w h-full px-8">
                    <h1 className="scroll-m-20  text-2xl font-extrabold tracking-tight lg:text-3xl mb-6">Introducing our Brain Tumor Detection Tool:</h1>

                    <span>Simplifying MRI analysis for medical professionals. With our intuitive interface, segmenting brain tumors from MRI scans is seamless and precise. Experience efficient diagnosis and treatment planning with our user-friendly solution</span>

                </div>


            </div>
            <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400 pb-5">© 2024. All Rights Reserved.</span>

        </div>

    )
}