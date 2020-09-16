import React, { Component } from "react";
import PageHeader from "./common/page-header";

class About extends Component {
  state = {};
  render() {
    return (
      <div className="container">
        <PageHeader title="About Our Community" description="&nbsp;" />
        <div className="row">
          <div className="col-12 text-center ">
<div className="card-body mt-4">
            <p className="display-4 bg-white rounded-pill">
            <b>
              Our community was created in 2020 <br/>
              To give everyone who loves and
              lives <br/>an art the opportunity to see and share between the arts of
              each other
</b>
            </p>
</div>

          </div>
        </div>
      </div>
    );
  }
}

export default About;
