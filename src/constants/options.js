export const travelCategories = [
  {
    id: 1,
    title: "Solo Adventurer",
    desc: "Explore the world on your terms as a fearless solo adventurer",
    icon: "🌍",
    people: "1 person",
  },
  {
    id: 2,
    title: "Partner Escapes",
    desc: "Experience unforgettable moments together with our customized duo retreats",
    icon: "👫",
    people: "2 people",
  },
  {
    id: 3,
    title: "Family Adventures",
    desc: "Build bonds and explore new horizons with our family adventures",
    icon: "👨‍👩‍👧‍👦",
    people: "3 to 5 people",
  },
  {
    id: 4,
    title: "Group",
    desc: `Explore the world as a group, enjoying tailored experiences that cater to everyone's interests`,
    icon: "🎢",
    people: "More than 5 people",
  },
];

export const budgetOptions = [
  {
    id: 1,
    title: "Cheap",
    desc: "Stay conscious of costs",
    icon: "🎟️",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Keep cost on the average side",
    icon: "🏨",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Place cost side apart",
    icon: "👑",
  },
];

export const AI_PROMPT = `
Generate travel plan for location: {location} for {totalDays} days for {traveler} with a {budget} budget. 
Give me a hotels options list with hotel name, hotel address, price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with place name, place details, place image url, geo coordinates, ticket pricing, rating, time travel for each of the location for {totalDays} days with each day plan with best time to visit in JSON format.Please remember to use these property names:
label: for location name, noOfDays: for the no of days for trip, budget: for budget of the trip, traveler: for no. of travelers, name: for hotel name, address: for hotel's address, price: for hotel's price, rating: for hotel's rating, place_name: for the place to visit name, place_details: for details of the place to visit, time: for time taken to visit that place.`;
