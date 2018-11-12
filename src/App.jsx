import React, { Component } from 'react';
import './App.css';


const PHOTO_URL = "https://picsum.photos/200?photo=";
const PHOTO_LIST_URL = "https://picsum.photos/list";

class App extends Component {
  state = {
    photos: [],
    renderCount: 0
  };

  componentDidMount() {
    fetch(PHOTO_LIST_URL)
    .then(response => response.json())
    .then(photoGroup => {
      this.setState({
        photos: photoGroup,
        renderCount: 10
      });
      console.log(photoGroup);
    })
    .catch(err => console.log(`${err} error`))
  };

  handleLoadMoreImages = evt => {
    this.setState(prevState => ({
      renderCount: prevState.renderCount + 10
    }))
  }

  render() {
    const { photos = [] } = this.state;
    return (
      <React.Fragment>
        <header>
          <h1>My Photo Wall!!!</h1>
        </header>
        <div className="collage">
            {/* We use map here because Array.prototype.map is an expression,
              * and for loops are not. You'll learn more about this soon! 
              */}
            {photos.slice(0, this.state.renderCount).map( photo => 
                <img alt={photo.filename}
                     key={photo.id}
                     src={`${PHOTO_URL}${photo.id}`}
                />
            )}
            <br/>
            <button onClick={this.handleLoadMoreImages}>Click Here For More Images</button>
        </div>
      </React.Fragment>
    );
  }
}

export default App;