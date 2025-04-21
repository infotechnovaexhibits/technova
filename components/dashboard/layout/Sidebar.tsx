"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  XMarkIcon,
  HomeIcon,
  PhotoIcon,
  UserGroupIcon,
  BuildingStorefrontIcon,
  ArrowLeftOnRectangleIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../../../lib/utils";

const navigation = [
  { name: "Home", href: "/dashboard", icon: HomeIcon },
  { name: "Services", href: "/dashboard/services", icon: WrenchScrewdriverIcon },
  { name: "Gallery", href: "/dashboard/gallery", icon: PhotoIcon },
  { name: "Testimonials", href: "/dashboard/testimonials", icon: UserGroupIcon },
  { name: "Leads", href: "/dashboard/leads", icon: BuildingStorefrontIcon },
  { name: "Brands", href: "/dashboard/brands", icon: BuildingStorefrontIcon },
  { name: "Logout", href: "/auth/logout", icon: ArrowLeftOnRectangleIcon },
];

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-[250px] flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                {/* Sidebar component for mobile */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-50 px-6 pb-4">
                  <div className="flex h-20 shrink-0 items-center">
                    <Image
                      className="h-20 w-auto"
                      src="/logo-new.png"
                      alt="Technova Exhibits"
                      width={200}
                      height={200}
                    />
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-2">
                          {navigation.map((item) => (
                            <li key={item.name}>
                              <Link
                                href={item.href}
                                className={cn(
                                  pathname === item.href
                                    ? "bg-white text-blue-600 shadow-sm"
                                    : "text-gray-700 hover:bg-white hover:text-blue-600",
                                  "group flex gap-x-4 rounded-md p-3 text-base font-medium transition-all duration-200"
                                )}
                              >
                                <item.icon
                                  className={cn(
                                    pathname === item.href
                                      ? "text-blue-600"
                                      : "text-gray-400 group-hover:text-blue-600",
                                    "h-6 w-6 shrink-0 transition-colors duration-200"
                                  )}
                                  aria-hidden="true"
                                />
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-50 px-6 pb-4">
          <div className="flex h-20 shrink-0 items-center">
            <Image
              className="h-20 w-auto"
              src="/logo-new.png"
              alt="Technova Exhibits"
              width={200}
              height={200}
            />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-2">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={cn(
                          pathname === item.href
                            ? "bg-white text-blue-600 shadow-sm"
                            : "text-gray-700 hover:bg-white hover:text-blue-600",
                          "group flex gap-x-4 rounded-md p-3 text-base font-medium transition-all duration-200"
                        )}
                      >
                        <item.icon
                          className={cn(
                            pathname === item.href
                              ? "text-blue-600"
                              : "text-gray-400 group-hover:text-blue-600",
                            "h-6 w-6 shrink-0 transition-colors duration-200"
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
} 