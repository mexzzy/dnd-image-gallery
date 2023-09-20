import React, { useState, useEffect } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { BiGridVertical } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import { FiInfo } from "react-icons/fi";
import logo from "../images/dnd.jpg";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

function Home() {
  const [query, setQuery] = useState("");
  const [searchImage, setSearchImage] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [skeletonLoading, setSkeletonLoading] = useState(false);
  const [errors, setErrors] = useState(false);

  const API_KEY = process.env.REACT_APP_API_KEY;
  const API_URL_SEARCH = "https://api.unsplash.com/search/photos";
  const API_URL_PHOTOS = "https://api.unsplash.com/photos";

  const searchImages = async () => {
    try {
      setSkeletonLoading(true);
      const response = await axios.get(API_URL_SEARCH, {
        headers: {
          Authorization: `Client-ID ${API_KEY}`,
        },
        params: {
          query: query,
        },
      });

      setSearchImage(response.data.results);
      setShowSearchResults(true);
      setSkeletonLoading(false);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const loadPhotos = async () => {
    try {
      setSkeletonLoading(true);
      const response = await axios.get(API_URL_PHOTOS, {
        headers: {
          Authorization: `Client-ID ${API_KEY}`,
        },
      });

      setSearchImage(response.data);
      setShowSearchResults(false);
      setSkeletonLoading(false);
    } catch (error) {
      console.error("Error fetching images:", error);
      if (error.message === "Network Error") {
        setErrors(true);
      }
    }
  };

  useEffect(() => {
    if (query !== "") {
      searchImages();
    } else {
      loadPhotos();
    }
  }, [query]);

  const handleDragDrop = (results) => {
    const { source, destination, type } = results;

    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "group") {
      const reorderingState = [...searchImage];
      const sourceIndex = source.index;
      const destinationIndex = destination.index;

      const [removedState] = reorderingState.splice(sourceIndex, 1);
      reorderingState.splice(destinationIndex, 0, removedState);

      setSearchImage(reorderingState);
    }
  };

  const { user, logout } = UserAuth();
  const handleLogout = async () => {
    try {
      await logout();
      user(false);
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <div>
      {errors && <div className="error">Connect to the Internet</div>}
      <nav>
        <span className="logo">
          <img src={logo} alt="logo" />
          <span className="logoText">image-gallery</span>
        </span>
        <div className="search-input">
          <CiSearch />
          <input
            type="text"
            placeholder="Search for images by tag..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        {user ? (
          <div className="emailFlex">
            {user.email}{" "}
            <button className="logout" onClick={handleLogout}>
              logout
            </button>
          </div>
        ) : (
          <div className="loginSignup">
            <Link to="/login">
              <button className="login">login</button>
            </Link>
            <Link to="/signup">
              <button className="signup">signUp</button>
            </Link>
          </div>
        )}
      </nav>
      {!user && (
        <div className="noteFlex">
          <div className="note">
            <FiInfo color="rgba(4, 101, 4, 0.757)" size={30} />
            <span style={{ fontSize: "13px" }}>
              Login to experience the drag and drop Rearrangement feature
            </span>
          </div>
        </div>
      )}
      {user ? (
        <DragDropContext onDragEnd={handleDragDrop}>
          <Droppable droppableId="ROOT" type="group">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="image-grid"
              >
                {skeletonLoading
                  ? Array.from({ length: 6 }).map((_, idx) => (
                      <div className="flex skeleton" key={idx}>
                        <Skeleton height={350} width={300} />
                        <Skeleton height={10} width={200} />
                      </div>
                    ))
                  : showSearchResults
                  ? searchImage.map((index, idx) => (
                      <Draggable
                        draggableId={index.id}
                        key={index.id}
                        index={idx}
                      >
                        {(provided) => (
                          <div
                            className="flex"
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                          >
                            <div className="dragIcon">
                              <BiGridVertical color="#fff" />
                            </div>
                            <img
                              src={index.urls.regular}
                              alt={index.alt_description}
                            />
                            <div className="alt_description">
                              {index.alt_description}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))
                  : searchImage.map((index, idx) => (
                      <Draggable
                        draggableId={index.id}
                        key={index.id}
                        index={idx}
                      >
                        {(provided) => (
                          <div
                            className="flex"
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                          >
                            <div className="dragIcon">
                              <BiGridVertical color="#fff" />
                            </div>
                            <img
                              src={index.urls.regular}
                              alt={index.alt_description}
                            />
                            <div className="alt_description">
                              {index.alt_description}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <div className="image-grid">
          {skeletonLoading
            ? Array.from({ length: 6 }).map((_, idx) => (
                <div className="flex skeleton" key={idx}>
                  <Skeleton height={350} width={300} />
                  <Skeleton height={10} width={200} />
                </div>
              ))
            : showSearchResults
            ? searchImage.map((index, idx) => (
                <div className="flex" key={index.id}>
                  <img src={index.urls.regular} alt={index.alt_description} />
                  <div className="alt_description">{index.alt_description}</div>
                </div>
              ))
            : searchImage.map((index, idx) => (
                <div className="flex" key={index.id}>
                  <img src={index.urls.regular} alt={index.alt_description} />
                  <div className="alt_description">{index.alt_description}</div>
                </div>
              ))}
        </div>
      )}
    </div>
  );
}

export default Home;
