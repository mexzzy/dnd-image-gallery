import React, { useState, useEffect } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function Home() {
  const [query, setQuery] = useState("");
  const [searchImage, setSearchImage] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false); // Track whether to show search results

  const API_KEY = "G-oZXsBPZOUB18De3CmvIPUPwS_x_6yFOI0CjWTwFVg";
  const API_URL_SEARCH = "https://api.unsplash.com/search/photos";
  const API_URL_PHOTOS = "https://api.unsplash.com/photos";

  const searchImages = async () => {
    try {
      const response = await axios.get(API_URL_SEARCH, {
        headers: {
          Authorization: `Client-ID ${API_KEY}`,
        },
        params: {
          query: query,
        },
      });

      setSearchImage(response.data.results);
      setShowSearchResults(true); // Show search results
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const loadPhotos = async () => {
    try {
      const response = await axios.get(API_URL_PHOTOS, {
        headers: {
          Authorization: `Client-ID ${API_KEY}`,
        },
      });

      setSearchImage(response.data);
      setShowSearchResults(false); // Hide search results
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    if (query !== "") {
      searchImages();
    } else {
      loadPhotos(); // Load photos if the query is empty
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

  return (
    <div>
      <nav>
        <span className="logo">drag-and-drop image-gallery</span>
        <div className="search-input">
          <input
            type="text"
            placeholder="Search for images by tag..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="loginSignup">
          <button>login</button>
          <button>sign up</button>
        </div>
      </nav>
      <DragDropContext onDragEnd={handleDragDrop}>
        <Droppable droppableId="ROOT" type="group">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="image-grid">
              {showSearchResults ? (
                // Render search results with drag and drop
                searchImage.map((index, idx) => (
                  <Draggable draggableId={index.id} key={index.id} index={idx}>
                    {(provided) => (
                      <div
                        className="flex"
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                      >
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
              ) : (
                // Render photos from the other endpoint with drag and drop
                searchImage.map((index, idx) => (
                  <Draggable draggableId={index.id} key={index.id} index={idx}>
                    {(provided) => (
                      <div
                        className="flex"
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                      >
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
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default Home;
