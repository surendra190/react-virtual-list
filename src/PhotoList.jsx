import React, { useEffect, useState } from "react";
import { List } from "react-window";

function PhotoRow({ index, style, photos, ariaAttributes }) {
  const photo = photos[index];

  return (
    <div
      {...ariaAttributes}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        padding: "10px",
        borderBottom: "1px solid #ddd",
        boxSizing: "border-box",
      }}
    >
      <strong style={{ width: "100px" }}>{photo.id}</strong>

      <span>{photo.title}</span>
    </div>
  );
}

function PhotoList() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((response) => {
        if (!response.ok) {
          throw new Error("API request failed");
        }
        return response.json();
      })
      .then((data) => {
        // Convert 5000 API records into 10000 test records
        // const tenThousandRecords = Array.from(
        //   { length: 10000 },
        //   (_, index) => ({
        //     ...data[index % data.length],
        //     id: index + 1,
        //   }),
        // );
        setPhotos(data);

        // setPhotos(tenThousandRecords);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <h3>Loading employees/photos...</h3>;
  if (error) return <h3>{error}</h3>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Virtualized Photo List</h2>

      <p>Total Records: {photos.length}</p>

      <List
        rowComponent={PhotoRow}
        rowCount={photos.length}
        rowHeight={50}
        rowProps={{ photos }}
        overscanCount={5}
        style={{ height: 600, width: "100%" }}
      />
    </div>
  );
}

export default PhotoList;
