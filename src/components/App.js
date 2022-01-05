import React from "react";
import { SearchComponent } from "./SearchComponent";
import youtube from "../apis/youtube";
import VideoList from "./VideoList";
import VideoDetail from "./VideoDetail";
export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { videos: [], selectedVideo: null };
  }
  componentDidMount() {
    this.onTermSubmit("buildings");
  }
  onTermSubmit = async (term) => {
    console.log(term);
    try {
      const {
        data: { items },
      } = await youtube.get("/search", {
        params: { q: term },
      });
      console.log("items", items.length);
      this.setState({ videos: items, selectedVideo: items[0] });
    } catch (error) {
      console.log(error);
    }
  };
  onVideoSelect = (video) => {
    console.log("From the App!", video);
    this.setState({ selectedVideo: video });
  };
  render() {
    return (
      <div className="ui container segment">
        <SearchComponent onFormSubmit={this.onTermSubmit} />
        <div className="ui grid">
          <div className="ui row">
            <div className="eleven wide column">
              <VideoDetail video={this.state.selectedVideo} />
            </div>
            <div className="five wide column">
              <VideoList
                onVideoSelect={this.onVideoSelect}
                videos={this.state.videos}
              ></VideoList>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
