import React, { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';   // 富文本编辑器插件
import draftToHtml from 'draftjs-to-html';  // 将富文本编译为html代码的工具
import { message } from 'antd';
import { uploadImg } from '@/http/notice';  // 上传图片接口
// import htmlToDraft from 'html-to-draftjs';
import '@/../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';    // 富文本样式文件
import './richText.scss'    
const allowType = ['jpg', 'jpeg', 'png', 'gif'] // 允许上传的文件类型
class RichText extends Component {
  state = {
      editorState: EditorState.createEmpty()    // 富文本默认设定为空状态
  }

  onEditorStateChange = (editorState) => {  // 富文本内容变化时调用
      this.props.onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())))   // 在富文本内容变化时，把内容编译为html代码回传给父组件
      this.setState({
          editorState   // 把内容赋值给富文本状态
      });
  };

  uploadImageCallBack = async (img) => {    // 上传图片的方法
      const type = img.name.split('.')[img.name.split('.').length - 1]  // 拿到文件类型
      if(allowType.find(item => {var reg = new RegExp(item, 'i'); return reg.test(type)}) && img.size < 512000) {
          // 仅可上传allowType中允许的格式并且图片不可超过500KB
          const url = (await uploadImg(img)).data.url   // 上传图片，并拿到服务器响应回来的文件路径
          console.log(url)
          return { data: { link: url} } // 把路径返回出去
      } else {
          message.error(`仅可上传${allowType.toString()}格式的图片，并且小于500KB`);    // 不满足要求的文件，提示错误
          return false
      }
  }

  render() {
      const { editorState } = this.state;
      return (
          <div>
              <Editor
                  editorState={editorState}
                  wrapperClassName="demo-wrapper"
                  editorClassName="demo-editor"
                  onEditorStateChange={this.onEditorStateChange}    // 当内容变化时
                  localization={{
                      locale: 'zh'  // 选择中文
                  }}
                  toolbar={{image: { uploadCallback: this.uploadImageCallBack }}}   // 选择图片后，拿到路径把图片显示出来
              />
              {/* <textarea
                  disabled
                  value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
              /> */}
          </div>
      );
  }
}

export default RichText