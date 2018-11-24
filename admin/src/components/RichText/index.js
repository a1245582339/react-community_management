import React, { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';
import '@/../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './richText.scss'


class RichText extends Component {
  state = {
      editorState: EditorState.createEmpty()
  }

  onEditorStateChange = (editorState) => {
      this.setState({
          editorState
      });
  };

  render() {
      const { editorState } = this.state;
      return (
          <div>
              <Editor
                  editorState={editorState}
                  wrapperClassName="demo-wrapper"
                  editorClassName="demo-editor"
                  onEditorStateChange={this.onEditorStateChange}
              />
              <textarea
                  disabled
                  value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
              />
          </div>
      );
  }
}

export default RichText