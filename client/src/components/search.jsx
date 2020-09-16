import React, { Component } from "react";
import PropTypes from "prop-types";

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: "",
    };
  }
  onSearchChange(e) {
    e.preventDefault();
    this.setState({ searchValue: e.target.value });
    if (this.props.onSearchTextChange) {
      this.props.onSearchTextChange(e.target.value);
    }
  }

  onSearchClick(e) {
    e.preventDefault();
    if (this.props.onSearchButtonClick) {
      this.props.onSearchButtonClick(this.state.searchValue);
    }
  }

  render() {
    return (
      <form
        onSubmit={(e) => this.onSearchClick(e)}
        className="form-inline my-2 my-lg-0 "
      >
        <div className="field">
          <input
            onChange={(e) => this.onSearchChange(e)}
            className="form-control mr-sm-2"
            name="search"
            type="text"
            placeholder="Search Title..."
            autoComplete="off"
          />
        </div>
        <button className="btn btn-outline-success my-2 my-sm-0">Search</button>
      </form>
    );
  }
}

SearchBar.propTypes = {
  onSearchButtonClick: PropTypes.func.isRequired,
};

export default SearchBar;
