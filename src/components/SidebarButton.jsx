
export const SidebarButton = ({toggleSidebar}) => {
  return (
    <button 
        className="text-gray-300 bg-transparent"
        onClick={toggleSidebar}
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
            />
        </svg>
    </button>
  )
}
