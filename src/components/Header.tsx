// import { HomeIcon, File, UsersRound, LogOut } from 'lucide-react';
// import Link from 'next/link';
// // import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';

// import { Button } from '@/components/ui/button';
// import { NavButton } from '@/components/NavButton';
// // import { ModeToggle } from '@/components/ModeToggle';
// // import { NavButtonMenu } from './NavButtonMenu';

// export function Header() {
//     return (
//         <header className="animate-slide bg-background h-12 p-2 border-b sticky top-0 z-20">

//             <div className="flex h-8 items-center justify-between w-full">

//                 <div className="flex items-center gap-2">
//                     <NavButton href="/tickets" label="Home" icon={HomeIcon} />

//                     <Link href="/tickets" className="flex justify-center items-center gap-2 ml-0" title="Home">
//                         <h1 className="hidden sm:block text-xl font-bold m-0 mt-1">
//                             Computer Repair Shop
//                         </h1>
//                     </Link>
//                 </div>

//                 <div className="flex items-center">

//                     <NavButton href="/tickets" label="Tickets" icon={File} />

//                     {/* <NavButtonMenu
//                         icon={UsersRound}
//                         label="Customers Menu"
//                         choices={[
//                             { title: "Search Customers", href: "/customers" },
//                             { title: "New Customer", href: "/customers/form" }
//                         ]}
//                     />

//                     <ModeToggle /> */}

//                     <Button
//                         variant="ghost"
//                         size="icon"
//                         aria-label="LogOut"
//                         title="LogOut"
//                         className="rounded-full"
//                         asChild
//                     >
//                         {/* <LogoutLink>
//                             <LogOut />
//                         </LogoutLink> */}
//                     </Button>

//                 </div>

//             </div>

//         </header>
//     )
// }


'use client';

import { Newspaper, Menu, User, LogOut, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ModeToggle';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-background border-b sticky top-0 z-50 h-16 px-4 md:px-8">
      <div className="flex h-full items-center justify-between max-w-screen-xl mx-auto">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2" title="NewsVibe">
          <Newspaper className="w-6 h-6 text-cyan-500" />
          <span className="text-xl font-bold text-cyan-400 tracking-tight hidden sm:inline">
            NewsVibe
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="/" className="hover:text-cyan-400 transition">Home</Link>
          <Link href="/categories" className="hover:text-cyan-400 transition">Categories</Link>
          <Link href="/about" className="hover:text-cyan-400 transition">About</Link>
        </nav>

        {/* Right Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Button variant="ghost" size="icon" title="User Profile">
            <User className="w-5 h-5 text-foreground" />
          </Button>
          <Button variant="ghost" size="icon" title="Logout">
            <LogOut className="w-5 h-5 text-foreground" />
          </Button>
          <ModeToggle />

          {/* Mobile hamburger toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="sm:hidden bg-background border-t px-4 py-3 space-y-2 text-sm font-medium text-muted-foreground">
          <Link href="/" className="block hover:text-cyan-400 transition" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/categories" className="block hover:text-cyan-400 transition" onClick={() => setMenuOpen(false)}>Categories</Link>
          <Link href="/about" className="block hover:text-cyan-400 transition" onClick={() => setMenuOpen(false)}>About</Link>
        </div>
      )}
    </header>
  );
}

