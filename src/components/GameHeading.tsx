// import useGenre from "../hooks/useGenre";
// import usePlatform from "../hooks/usePlatform";
// import useGameQueryStore from "../store";

// const GameHeading = () => {
//   const {query} = useGameQueryStore();
//   const genre = useGenre();
//   console.log(genre);
//   const platformId = useGameQueryStore((s) => s.gameQuery.platformId);
//   const platform = usePlatform(platformId);
//   console.log(platform, "platform");

//   const heading = `${platform?.name || ""} ${genre?.name || ""} Games`;

//   return <h1 className="my-5 text-5xl">{heading}</h1>;
// };

// export default GameHeading;
