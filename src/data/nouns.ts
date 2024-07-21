import { Categories, CategoryItem } from "@/ts/Interfaces";

export const CATEGORIES: Categories<CategoryItem> = {
  Common: [
    { key: "people", name: "People" },
    { key: "trash", name: "Trash" },
  ],

  Professions: [
    { key: "programmers", name: "Programmers" },
    { key: "doctors", name: "Doctors" },
    { key: "engineers", name: "Engineers" },
    { key: "scientists", name: "Scientists" },
    { key: "athletes", name: "Athletes" },
    { key: "politicians", name: "Politicians" },
  ],

  Species: [
    { key: "endemic_animals", name: "Endemic Animals" },
    { key: "endemic_plants", name: "Endemic Plants" },
  ],

  Places: [
    { key: "roads", name: "Roads" },
    { key: "bridges", name: "Bridges" },
    { key: "hills", name: "Hills" },
    { key: "mountains", name: "Mountains" },
    { key: "rivers", name: "Rivers" },
    { key: "lakes", name: "Lakes" },
    { key: "forests", name: "Forests" },
    { key: "deserts", name: "Deserts" },
    { key: "caves", name: "Caves" },
    { key: "cliffs", name: "Cliffs" },
    { key: "waterfalls", name: "Waterfalls" },
    { key: "beaches", name: "Beaches" },
    { key: "parks", name: "Parks" },
    { key: "gardens", name: "Gardens" },
    { key: "markets", name: "Markets" },
    { key: "hospitals", name: "Hospitals" },
    { key: "schools", name: "Schools" },
    { key: "universities", name: "Universities" },
    { key: "stores", name: "Stores" },
    { key: "restaurants", name: "Restaurants" },
    { key: "hotels", name: "Hotels" },
    { key: "museums", name: "Museums" },
    { key: "theaters", name: "Theaters" },
    { key: "stadiums", name: "Stadiums" },
    { key: "libraries", name: "Libraries" },
    { key: "zoos", name: "Zoos" },
    { key: "aquariums", name: "Aquariums" },
    { key: "pools", name: "Pools" },
    { key: "gyms", name: "Gyms" },
    { key: "warehouses", name: "Warehouses" },
    { key: "factories", name: "Factories" },
    { key: "airports", name: "Airports" },
  ],
};
