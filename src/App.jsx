import { useState } from "react";
import "./App.css";
import image from "./assets/octocat.png";
import { BsSearch } from "react-icons/bs";
import { ImLocation } from "react-icons/im";
import { FiLink } from "react-icons/fi";
import { BsTwitter } from "react-icons/bs";
import { BsBuilding } from "react-icons/bs";

function App() {
  const [searchValue, setSearchValue] = useState([]);
  const [userProfile, setUserProfile] = useState({});
  const [theme, setTheme] = useState(false);

  function userFetch() {
    fetch(`https://api.github.com/users/${searchValue}`)
      .then((response) => response.json())
      .then((body) => {
        setUserProfile(body);
        console.log(body);
      });
  }

  // function background() {
  //   if (theme === "dark") {
  //     setTheme("dark");
  //   } else {
  //     setTheme("light");
  //   }
  // }

  function getDate(date) {
    const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
    const newDate = new Date(date);
    return `${newDate.getDay()} ${
      months[newDate.getMonth()]
    } ${newDate.getFullYear()}`;
  }

  return (
    <div
      className="App"
      style={{
        backgroundColor: theme ? "rgb(206, 206, 206)" : "rgb(0, 12, 36)",
      }}
    >
      <div
        className="main"
        style={{
          backgroundColor: theme ? "rgb(206, 206, 206)" : "rgb(0, 12, 36)",
        }}
      >
        <div
          className="navigation"
          style={{
            backgroundColor: theme ? "rgb(206, 206, 206)" : "rgb(0, 12, 36)",
            color: theme ? "black" : "white",
          }}
        >
          <h1 className="title">devfinder</h1>
          <button
            onClick={() => {
              setTheme(!theme);
            }}
            className="mode"
          >
            {theme ? "Dark Mode" : "Light Mode"}
          </button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (searchValue !== "") {
              userFetch();
            }
          }}
          className="input"
          style={{ backgroundColor: theme ? "white" : "rgb(0, 29, 85)" }}
        >
          <BsSearch color={theme ? "black" : "white"} />
          <input
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            type="text"
            className="search"
            placeholder="search"
            style={{
              backgroundColor: theme ? "white" : "rgb(0, 29, 85)",
              color: theme ? "black" : "white",
            }}
          />
          <button onClick={userFetch} className="button">
            Search
          </button>
        </form>
        <div
          className="profile"
          style={{
            backgroundColor: theme ? "white" : "rgb(0, 29, 85)",
            color: theme ? "black" : "white",
          }}
        >
          <div className="image">
            {" "}
            <img
              src={userProfile.avatar_url ?? image}
              alt=""
              className="octocat"
            />
          </div>
          <div className="identity">
            <div className="person">
              <h1 className="name">{userProfile.name ?? "Octocat"}</h1>
              <h1 className="date">
                Joined{" "}
                {userProfile.created_at
                  ? getDate(userProfile.created_at)
                  : " 25 January 2023"}
              </h1>
            </div>
            <div className="user">
              <h1 className="link">@{userProfile.login ?? "octocat"}</h1>
              <h1 className="about">
                {userProfile.bio ?? "This profile has no bio"}
              </h1>
            </div>
            <div
              className="social"
              style={{
                backgroundColor: theme
                  ? "rgb(206, 206, 206)"
                  : "rgb(0, 12, 36)",
                color: theme ? "black" : "white",
              }}
            >
              <div className="repos">
                <h1 className="text">Repos</h1>
                <h1 className="number">{userProfile.public_repos ?? "8"}</h1>
              </div>
              <div className="followers">
                <h1 className="text">Followers</h1>
                <h1 className="number">{userProfile.followers ?? "3945"}</h1>
              </div>
              <div className="following">
                <h1 className="text">Following</h1>
                <h1 className="number">{userProfile.following ?? "9"}</h1>
              </div>
            </div>
            <div className="availability">
              <div className="collection">
                <span className="url1">
                  <ImLocation />
                  {userProfile.location ?? " Not available"}
                </span>
                <a href={userProfile.html_url} className="url">
                  <span
                    className="url2"
                    style={{ color: theme ? "black" : "white" }}
                  >
                    <FiLink color={theme ? "black" : "white"} />
                    {userProfile.html_url ? "Profile_link" : "Not available"}
                  </span>
                </a>
              </div>
              <div className="collection2">
                <span className="style">
                  <BsTwitter />
                  {userProfile.twitter_username ?? " Not available"}
                </span>
                <span className="style">
                  <BsBuilding />
                  {userProfile.company ?? " Not available"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
