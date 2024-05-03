import HeaderLogo from '/header_logo.png'

export default function Header() {
    return(
        <header className="w-full flex sm:justify-start justify-center bg-white py-6">
        <img src={HeaderLogo} alt="Logo do Cabeçalho do site" className="w-60 ml-0 sm:ml-20"/>
  
      </header>
  
    )
}