"use client"

const CategoryFilter = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <div className="space-y-2">
      <div
        className={`flex items-center p-2 rounded-md cursor-pointer ${
          selectedCategory === "all" ? "bg-blue-100 text-blue-900" : "hover:bg-gray-100"
        }`}
        onClick={() => setSelectedCategory("all")}
      >
        <span className="w-full">All Products</span>
      </div>

      {categories.map((category) => (
        <div
          key={category}
          className={`flex items-center p-2 rounded-md cursor-pointer ${
            selectedCategory === category ? "bg-blue-100 text-blue-900" : "hover:bg-gray-100"
          }`}
          onClick={() => setSelectedCategory(category)}
        >
          <span className="w-full">{category}</span>
        </div>
      ))}
    </div>
  )
}

export default CategoryFilter
