import { bg_style } from "@/globals/tailwindvariables"
import SettingSidebar from "../verticleBar"
import NoData from "./components/NoData"
import Materials from "./components/Materials"

const page = () => {

    return (

        <SettingSidebar>
            <section className={`${bg_style} p-5 w-full`}>
                {/* <NoData btnText="+ Import Materials" link="" /> */}
                <Materials />
            </section>
        </SettingSidebar>
    )
}

export default page