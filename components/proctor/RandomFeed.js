import { useContext, useEffect, useState } from "react";
import StudentFeed from "./StudentFeed";
import ProctorContext from "../../lib/ProctorContext";

export default function RandomFeed() {
  const { useStudentsStore } = useContext(ProctorContext);
  const feeds = useStudentsStore(state => state.feeds);
  console.log(feeds)
  function getRandomFeed() {
    const items = Object.keys(feeds);
    return items[Math.floor(Math.random() * items.length)];
  }
  
  const [active, setActive] = useState(() => getRandomFeed());

  useEffect(() => {
    function updateRandomFeed() {
      const feed = getRandomFeed();
      if (feed == active && Object.keys(feeds).length > 1) return getRandomFeed();
      return feed;
    }
    const interval = setInterval(() => {
      setActive(updateRandomFeed());
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="text-center">
      Random Feed
      <StudentFeed feed={feeds[active]} />
      <p>{active}</p>
    </div>
  );
}
