import React, { Component, useEffect, useRef } from "react";
import { render } from "react-dom";
import Hello from "./Hello";
import "./style.css";

function App() {
  const inputEl = useRef(null);
  const data =
    '<random> <li>Hello.</li> <li>Hi.</li> <li>Everything is going extremely well.</li> <li>Hey.</li> <li>Nice to see you.</li> <li>Hi!</li> <li>Hi there.</li> <li>Good to see you.</li> </random>';

  useEffect(() => {
    inputEl.current.innerText = process(data);
  }, [data]);

  const process = str => {
    var parser = new DOMParser();
    var htmlDoc = parser.parseFromString(str, "text/html");
    const ele = React.createElement("div", { ref: "node" }, htmlDoc.body);
    return format(ele.props.children, 0).innerHTML;
  };

  const format = (node, level) => {
    var indentBefore = new Array(level++ + 1).join("  "),
      indentAfter = new Array(level - 1).join("  "),
      textNode;

    for (var i = 0; i < node.children.length; i++) {
      textNode = document.createTextNode("\n" + indentBefore);
      node.insertBefore(textNode, node.children[i]);

      format(node.children[i], level);

      if (node.lastElementChild == node.children[i]) {
        textNode = document.createTextNode("\n" + indentAfter);
        node.appendChild(textNode);
      }
    }
    return node;
  };

  return (
    <>
      <pre ref={inputEl}/>
    </>
  );
}

render(<App />, document.getElementById("root"));
