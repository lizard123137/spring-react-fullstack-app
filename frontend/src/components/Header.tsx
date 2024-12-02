function Header() {
    return (
        <header className='flex flex-row justify-between'>
            <h1 className="text-5xl">Drogon App</h1>
            <nav>
                <ul className='flex flex-row'>
                    <li className='p-5'><a href="#">Articles</a></li>
                    <li className='p-5'><a href="#">About me</a></li>
                    <li className='p-5'><a href="#">Contact</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header