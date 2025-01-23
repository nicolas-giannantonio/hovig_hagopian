import Link from "next/link";

export default function Navigation() {
    return (
        <nav id={"nv"}>

            <Link href={"/"}>Hovig Hagopian</Link>

            <div className="nv__pages_links">
                <Link className="nv_link" href={"/"}>Clip</Link>
                <Link className="nv_link" href={"/"}>Fiction et documentaire</Link>
                <Link className="nv_link" href={"/"}>Pub</Link>
            </div>

            <div className="nv__pages_links">
                <Link className="nv_link" href={"/Resume"}>Resume</Link>
                <Link className="nv_link" href={"/Contact"}>Contact</Link>
                <Link className="nv_link" href={"/"}></Link>
            </div>


        </nav>
    )
}
