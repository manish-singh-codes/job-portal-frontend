import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, User2, Menu, BriefcaseIcon, Bell, Settings } from 'lucide-react';
import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axiosInstance from "../../utils/axios/axiosInstance";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/authSlice";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
     const getUser = async () => {
      try {
        const res = await axiosInstance.get("/api/user/getUser", {
            withCredentials: true,
            });
        dispatch(setUser(res.data.user));
      } catch (error) {
        console.log(error);
      }
     }
     getUser();
  }, []);

  const handleLogout = async()=>{
    setOpen(false)
    try {
      await axiosInstance.get("/api/user/logout", {
        withCredentials: true,
      });
      dispatch(setUser(null));
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <header className="bg-white sticky top-0 z-50 border-b shadow-sm w-full">
      <nav className="flex h-16 items-center justify-between mx-auto  px-4 sm:px-6 lg:px-8">
        {/* Logo */}
         <div className="flex items-center gap-3 ">
                <div className="relative w-10 h-10">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-cyan-400 opacity-90 z-30"></div>
                  <div className="absolute bottom-0 left-0 w-5 h-5 rounded-full bg-violet-400 opacity-90 z-20"></div>
                  <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-indigo-300 opacity-90 z-10"></div>
                </div>
                <h1 className="text-3xl font-bold">JobNest</h1>
              </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-6">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/jobs" 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Jobs
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Contact
            </Link>
          </div>

          {!user ? (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button 
                  variant="ghost" 
                  className="font-medium hover:bg-gray-100"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button 
                  className="bg-red-500 text-white hover:bg-red-600 font-medium"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative"
              >
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </Button>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="h-10 w-10 rounded-full p-0"
                  >
                    <Avatar>
                      <AvatarImage
                        src={user.profile.profilePhoto}
                        alt="User profile"
                      />
                      <AvatarFallback>MS</AvatarFallback>
                    </Avatar>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-4">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 pb-3 border-b">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={user?.profile?.profilePhoto}
                          alt="User profile"
                        />
                        <AvatarFallback>MS</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h4 className="font-semibold text-sm">{user.fullname}</h4>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Button asChild 
                        variant="ghost" 
                        className="w-full justify-start gap-2 text-gray-600 hover:text-gray-900"
                      >
                        <Link to={'/profile'} >
                        <User2 className="h-4 w-4" />
                        View Profile
                        </Link>
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start gap-2 text-gray-600 hover:text-gray-900"
                      >
                        <BriefcaseIcon className="h-4 w-4" />
                        My Applications
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start gap-2 text-gray-600 hover:text-gray-900"
                      >
                        <Settings className="h-4 w-4" />
                        Settings
                      </Button>
                      <Button onClick={handleLogout} 
                        variant="ghost" 
                        className="w-full justify-start gap-2 text-red-500 hover:text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col h-full">
                <div className="space-y-4 py-4">
                  <Link 
                    to="/"
                    onClick={()=>setOpen(false)} 
                    className="flex items-center gap-2 text-lg font-semibold"
                  >
                    <div className="relative w-8 h-7">
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-blue-500 opacity-80 z-30"></div>
                      <div className="absolute bottom-0 left-0 w-5 h-5 rounded-full bg-red-500 opacity-80 z-20"></div>
                      <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-green-500 opacity-80 z-10"></div>
                    </div>
                    JOBNEST
                  </Link>
                  <div className="space-y-1">
                    <Link 
                      to="/" 
                      onClick={()=>setOpen(false)}
                      className="block py-2 text-lg font-medium text-gray-600 hover:text-gray-900"
                    >
                      Home
                    </Link>
                    <Link 
                    onClick={()=>setOpen(false)}
                      to="/jobs" 
                      className="block py-2 text-lg font-medium text-gray-600 hover:text-gray-900"
                    >
                      Jobs
                    </Link>
                    <Link 
                    onClick={()=>setOpen(false)}
                      to="/contact" 
                      className="block py-2 text-lg font-medium text-gray-600 hover:text-gray-900"
                    >
                      Contact
                    </Link>
                  </div>
                </div>
                <div className="mt-auto border-t py-4">
                  {!user ? (
                    <div className="grid gap-2">
                      <Link to="/login" 
                      onClick={()=>setOpen(false)} >
                        <Button variant="outline" className="w-full">
                          Login
                        </Button>
                      </Link>
                      <Link to="/signup"
                      onClick={()=>setOpen(false)}>
                        <Button className="w-full bg-red-500 text-white hover:bg-red-600">
                          Sign Up
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 pb-4">
                        <Avatar>
                          <AvatarImage
                            src={user?.profile?.profilePhoto}
                            alt="User profile"
                          />
                          <AvatarFallback>MS</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold">Manish Singh</h4>
                          <p className="text-sm text-gray-500">manish@gmail.com</p>
                        </div>
                      </div>
                      <div className="space-y-1">
                          <Button asChild 
                        variant="ghost" 
                        className="w-full justify-start gap-2 text-gray-600 hover:text-gray-900"
                      >
                        <Link to={'/profile'}
                        onClick={()=>setOpen(false)} >
                        <User2 className="h-4 w-4" />
                        View Profile
                        </Link>
                      </Button>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start gap-2"
                        >
                          <BriefcaseIcon className="h-4 w-4" />
                          My Applications
                        </Button>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start gap-2"
                        >
                          <Settings className="h-4 w-4" />
                          Settings
                        </Button>
                        <Button 
                          onClick={handleLogout}
                          variant="ghost" 
                          className="w-full justify-start gap-2 text-red-500 hover:text-red-600"
                        >
                          <LogOut className="h-4 w-4" />
                          Logout
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

