"use client";
import { House , FileCheckCorner, BookHeart, Briefcase, Utensils, LibraryBig} from "lucide-react"
export default function Sidebar() {
  return (
    <aside
      className="w-64 bg-white rounded-3xl shadow-sm border-r border-zinc-200 m-2 p-6 flex flex-col gap-6"
    >
      <div>
        <h2 className="text-sm font-semibold text-zinc-500 uppercase mb-3">Madhu's Dashboard</h2>

        <div className="flex flex-col gap-1.5">
          {[
            { label: "Home", icon: <House className="text-black"/> },
            { label: "Completed", icon:<FileCheckCorner className="text-black"/> },
            { label: "Personal", icon: <BookHeart className="text-black"/> },
            { label: "Work", icon: <Briefcase className="text-black"/>  },
            { label: "Diet", icon: <Utensils className="text-black"/>  },
            { label: "List of Books", icon: <LibraryBig  className="text-black"/> },
          ].map((item) => (
            <button
              key={item.label}
              className="
                flex items-center gap-3 px-4 py-2.5 rounded-xl
                hover:bg-zinc-100 transition text-sm font-medium text-zinc-700
              "
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      </div>

     
    </aside>
  );
}
