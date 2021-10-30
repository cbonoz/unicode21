import React from "react";
import PropTypes from "prop-types";
import { Collapse } from "antd";
import { ACCORDIONS } from "../util/learn";

const { Panel } = Collapse;

function Learn(props) {
  return (
    <div>
      <h3>A primer to core Uniswap concepts</h3>
      <br />
      <Collapse accordion>
        {ACCORDIONS.map(({ term, content, url }, i) => {
          return (
            <Panel header={term} key={i}>
              <p>{content}</p>
              {url && (
                <p>
                  <a href={url} target="_blank">
                    More information
                  </a>
                </p>
              )}
            </Panel>
          );
        })}
      </Collapse>
    </div>
  );
}

export default Learn;
