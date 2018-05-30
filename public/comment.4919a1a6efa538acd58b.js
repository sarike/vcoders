(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{"./app/api/comment.js":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o,a=n("./app/redux/type.js"),r=n("./app/api/api.js"),i=(o=r)&&o.__esModule?o:{default:o};t.default=new i.default({view:{url:"/api/comment/:id",actionType:a.LOAD_COMMENT_DETAIL},replies:{url:"/api/comment/:id/replies",actionType:a.LOAD_REPLY_LIST},addReply:{method:"post",url:"/api/comment/:id/reply",actionType:a.ADD_REPLY}})},"./app/component/comment-detail/comment-detail.scss":function(e,t,n){var o=n("./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js??ref--6-2!./node_modules/sass-loader/lib/loader.js!./app/component/comment-detail/comment-detail.scss");"string"==typeof o&&(o=[[e.i,o,""]]);var a={hmr:!0,transform:void 0};n("./node_modules/style-loader/lib/addStyles.js")(o,a);o.locals&&(e.exports=o.locals)},"./app/component/comment-detail/index.jsx":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),a=n("./node_modules/react/index.js"),r=s(a),i=s(n("./node_modules/prop-types/index.js")),l=n("./app/util/index.js");function s(e){return e&&e.__esModule?e:{default:e}}n("./app/component/comment-detail/comment-detail.scss");var c=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,a.PureComponent),o(t,[{key:"handleViewTopicDetail",value:function(e,t){e.preventDefault(),this.props.onViewTopicDetail(t)}},{key:"handleViewParentComment",value:function(e,t){e.preventDefault(),this.props.onViewParentComment(t)}},{key:"renderComment",value:function(){var e=this,t=this.props.comment;if(!t)return"未获取到评论详情...";var n=t.topic,o=t.parent,a=t.content,i=t.user,s=t.createTime;return r.default.createElement("div",null,r.default.createElement("div",{className:"mb-3",dangerouslySetInnerHTML:{__html:(0,l.parseMarkdown)(a)}}),r.default.createElement("div",{className:"mb-3"},r.default.createElement("small",null,r.default.createElement("a",{href:"#"},i&&i.nickName)," 评论于 ",(0,l.formatDatetime)(s))),o&&r.default.createElement("div",{className:"origin-comment p-3 mb-3 rounded"},r.default.createElement("a",{href:"#",onClick:function(t){return e.handleViewParentComment(t,o)}},"原评论：",o.content),r.default.createElement("div",null,r.default.createElement("small",null,"由 ",o.user.nickName," 评论于 ",(0,l.formatDatetime)(o.createTime)))),r.default.createElement("div",{className:"origin-topic p-3 rounded"},r.default.createElement("a",{href:"#",onClick:function(t){return e.handleViewTopicDetail(t,n)}},"原主题：",n.title),r.default.createElement("div",null,r.default.createElement("small",null,"由 ",n.user.nickName," 发布于 ",(0,l.formatDatetime)(n.createTime)))))}},{key:"render",value:function(){var e=this.props.loading;return r.default.createElement("div",{className:"card mb-3 comment-detail"},r.default.createElement("div",{className:"card-body"},e?"正在加载评论详情...":this.renderComment()))}}]),t}();t.default=c,c.propTypes={loading:i.default.bool,comment:i.default.object,onViewTopicDetail:i.default.func,onViewParentComment:i.default.func},c.defaultProps={loading:!1,comment:null,onViewTopicDetail:function(){return null},onViewParentComment:function(){return null}}},"./app/component/comment-form/index.jsx":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),a=n("./node_modules/react/index.js"),r=c(a),i=c(n("./node_modules/classnames/index.js")),l=c(n("./common/validate.js")),s=c(n("./common/validation/comment.js"));function c(e){return e&&e.__esModule?e:{default:e}}var u=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={formData:{content:""},validateResult:null},n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,a.Component),o(t,[{key:"handleFieldChange",value:function(e){var t=e.target.value,n=(0,l.default)({content:t},s.default);this.setState({formData:{content:t},validateResult:n})}},{key:"handleSave",value:function(){var e=this,t=this.state,n=t.validateResult,o=t.formData;if(n.isValid){var a=this.props.onSave(o.content);a&&a.then&&a.then(function(){return e.setState({formData:{content:""}})})}}},{key:"render",value:function(){var e=this,t=this.state.validateResult,n=(0,i.default)({"form-control":!0,"is-valid":t&&t.isValid,"is-invalid":t&&!t.isValid});return r.default.createElement("div",null,r.default.createElement("strong",null,r.default.createElement("label",{htmlFor:"comment-content"},"发表新评论")),r.default.createElement("div",{className:"mb-3"},r.default.createElement("textarea",{id:"comment-content",placeholder:"请输入你对这个主题的看法……",value:this.state.formData.content,onChange:function(t){return e.handleFieldChange(t)},className:n,cols:"30",rows:"5"}),r.default.createElement("div",{className:"invalid-feedback"},t&&(t.errors||{}).content)),r.default.createElement("button",{className:"btn btn-primary",type:"button",disabled:this.props.loading||!this.state.formData.content,onClick:function(){return e.handleSave()}},this.props.loading?"正在提交...":"提交评论"))}}]),t}();t.default=u},"./app/component/comment-item/comment-item.scss":function(e,t,n){var o=n("./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js??ref--6-2!./node_modules/sass-loader/lib/loader.js!./app/component/comment-item/comment-item.scss");"string"==typeof o&&(o=[[e.i,o,""]]);var a={hmr:!0,transform:void 0};n("./node_modules/style-loader/lib/addStyles.js")(o,a);o.locals&&(e.exports=o.locals)},"./app/component/comment-item/index.jsx":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),a=n("./node_modules/react/index.js"),r=s(a),i=s(n("./node_modules/prop-types/index.js")),l=n("./app/util/index.js");function s(e){return e&&e.__esModule?e:{default:e}}n("./app/component/comment-item/comment-item.scss");var c=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,a.Component),o(t,[{key:"render",value:function(){var e=this,t=this.props.comment;return t?r.default.createElement("div",{onClick:function(){return e.props.onClick(t)},className:"comment-item list-group-item list-group-item-action flex-column"},r.default.createElement("div",{className:"d-flex w-100 align-items-center mb-3"},r.default.createElement("img",{src:t.user.avatarURL,alt:t.user.nickName,className:"avatar mr-2"}),r.default.createElement("small",null,r.default.createElement("a",{href:"#"},t.user.nickName)," 发布于 ",(0,l.formatDatetime)(t.createTime))),r.default.createElement("p",{dangerouslySetInnerHTML:{__html:(0,l.parseMarkdown)(t.content)},className:"mb-1"})):null}}]),t}();c.propTypes={comment:i.default.object,onClick:i.default.func},c.defaultProps={comment:null,onClick:function(){return null}},t.default=c},"./app/component/comment-list/index.jsx":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),a=n("./node_modules/react/index.js"),r=s(a),i=s(n("./node_modules/prop-types/index.js")),l=s(n("./app/component/comment-item/index.jsx"));function s(e){return e&&e.__esModule?e:{default:e}}var c=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,a.Component),o(t,[{key:"renderCommentList",value:function(){var e=this.props,t=e.loading,n=e.commentList,o=e.onItemClick;return t&&0===n.length?r.default.createElement("div",{className:"card"},r.default.createElement("div",{className:"card-body"},"正在加载评论列表...")):0===n.length?r.default.createElement("div",{className:"card"},r.default.createElement("div",{className:"card-body"},"还没有评论，快来抢沙发吧")):n.map(function(e){return r.default.createElement(l.default,{key:e.id,comment:e,onClick:function(e){return o(e)}})})}},{key:"render",value:function(){return r.default.createElement("div",{className:"comment-list"},r.default.createElement("div",{className:"mb-2"},r.default.createElement("strong",null,"评论列表")),this.renderCommentList())}}]),t}();c.propTypes={loading:i.default.bool,commentList:i.default.array,onItemClick:i.default.func},c.defaultProps={loading:!1,commentList:[],onItemClick:function(){return null}},t.default=c},"./app/component/pagination/index.jsx":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),a=n("./node_modules/react/index.js"),r=l(a),i=l(n("./node_modules/prop-types/index.js"));function l(e){return e&&e.__esModule?e:{default:e}}n("./app/component/pagination/pagination.scss");var s=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,a.PureComponent),o(t,[{key:"handleChangePage",value:function(e,t){e.preventDefault();var n=this.props.page,o=this.pageCount(),a=n+t;0===n||n>o||this.props.onChangePage(a)}},{key:"pageCount",value:function(){var e=this.props,t=e.pageSize,n=e.total,o=parseInt(n/t);return n%t==0?o:o+1}},{key:"render",value:function(){var e=this,t=this.props.page,n=this.pageCount();return r.default.createElement("nav",{className:"pager","aria-label":"Page navigation"},r.default.createElement("ul",{className:"pagination"},r.default.createElement("li",{className:"page-item "+(t<=1?"disabled":"")},r.default.createElement("a",{className:"page-link",href:"#",onClick:function(t){return e.handleChangePage(t,-1)},tabIndex:"-1"},"上一页")),r.default.createElement("li",{className:"page-item"},r.default.createElement("div",{className:"page-link"},"第 ",t," 页，共 ",n," 页")),r.default.createElement("li",{className:"page-item "+(t>=n?"disabled":"")},r.default.createElement("a",{className:"page-link",href:"#",onClick:function(t){return e.handleChangePage(t,1)}},"下一页"))))}}]),t}();s.propTypes={onChangePage:i.default.func,total:i.default.number,pageSize:i.default.number,page:i.default.number},s.defaultProps={onChangePage:function(){return null},total:0,pageSize:30,page:1},t.default=s},"./app/component/pagination/pagination.scss":function(e,t,n){var o=n("./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js??ref--6-2!./node_modules/sass-loader/lib/loader.js!./app/component/pagination/pagination.scss");"string"==typeof o&&(o=[[e.i,o,""]]);var a={hmr:!0,transform:void 0};n("./node_modules/style-loader/lib/addStyles.js")(o,a);o.locals&&(e.exports=o.locals)},"./app/container/comment.jsx":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),a=n("./node_modules/react/index.js"),r=m(a),i=n("./node_modules/react-redux/es/index.js"),l=m(n("./app/api/comment.js")),s=m(n("./app/component/pagination/index.jsx")),c=m(n("./app/component/comment-detail/index.jsx")),u=m(n("./app/component/comment-list/index.jsx")),d=m(n("./app/component/comment-form/index.jsx"));function m(e){return e&&e.__esModule?e:{default:e}}var p=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,a.PureComponent),o(t,[{key:"componentDidMount",value:function(){var e=this.commentId(),t=this.props.comment;t&&e===t.id||l.default.view({params:{id:e}},{commentId:e}),this.loadReplies()}},{key:"componentDidUpdate",value:function(){var e=this.props,t=e.comment,n=e.commentLoading;if(!(t&&t.id===this.commentId()||n)){var o=this.commentId();l.default.view({params:{id:o}},{commentId:o}),this.loadReplies()}}},{key:"toHome",value:function(){this.props.history.push("/")}},{key:"commentId",value:function(){return parseInt(this.props.match.params.id,10)}},{key:"loadReplies",value:function(){arguments.length>0&&void 0!==arguments[0]&&arguments[0];l.default.replies({params:{id:this.commentId()}},{commentId:this.commentId()})}},{key:"handleCommentPageChange",value:function(e){this.loadCommentList(e)}},{key:"handleViewCommentDetail",value:function(e){this.props.history.push("/comment/"+e.id)}},{key:"handleViewTopicDetail",value:function(e){this.props.history.push("/topic/"+e.id)}},{key:"handleSaveComment",value:function(e){var t=this.commentId();return l.default.addReply({params:{id:t},data:{content:e}},{commentId:t})}},{key:"render",value:function(){var e=this,t=this.props,n=t.comment,o=t.replyList,a=t.commentLoading,i=t.replyListLoading,l=t.addNewReplyLoading;return r.default.createElement("div",{className:"container mt-4"},r.default.createElement("div",{className:"row"},r.default.createElement("div",{className:"col-12"},r.default.createElement(c.default,{loading:a,comment:n,onViewParentComment:function(t){return e.handleViewCommentDetail(t)},onViewTopicDetail:function(t){return e.handleViewTopicDetail(t)}}),r.default.createElement("div",{className:"mb-3"},r.default.createElement(u.default,{loading:i,commentList:o.list,onItemClick:function(t){return e.handleViewCommentDetail(t)}})),o.total>0&&r.default.createElement("div",{className:"mb-3"},r.default.createElement(s.default,{page:o.page,total:o.total,pageSize:o.pageSize,onChangePage:function(t){return e.handleCommentPageChange(t)}})),r.default.createElement("div",{className:"mb-3"},r.default.createElement(d.default,{loading:l,onSave:function(t){return e.handleSaveComment(t)}})))))}}]),t}();t.default=(0,i.connect)(function(e){return e})(p)},"./common/validate.js":function(e,t,n){"use strict";var o=n("./node_modules/validator/index.js");e.exports=function(t,n){var o={isValid:!0,data:null,errors:null};return n?(Object.keys(n).forEach(function(a){var r=e.exports.validateField(t[a],n[a],t);r.isValid?(o.data||(o.data={}),void 0!==t[a]&&(o.data[a]=t[a])):(o.isValid=!1,o.errors||(o.errors={}),o.errors[a]=r.error)}),o):o},e.exports.validateField=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,a={isValid:!0,error:""};return t.forEach(function(t){var r=t.validator,i=t.extraArgs,l=t.reverse,s=void 0!==l&&l,c=t.message,u=void 0===c?"":c;if(a.isValid){var d="function"==typeof r,m=d?r:o[r];if(!m)throw new Error(r+" is not a valid validator.");var p=void 0;p=d?[n]:Array.isArray(i)?i:[i],a.isValid=m.apply(void 0,[e].concat(function(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}(p))),a.isValid=s?!a.isValid:a.isValid,a.isValid||(a.isValid=!1,a.error=u)}}),a}},"./common/validation/comment.js":function(e,t,n){"use strict";e.exports={content:[{validator:"isEmpty",reverse:!0,message:"请输入评论内容"},{validator:"isLength",extraArgs:{min:10},message:"让每一条评论都有意义，请至少输入 10 个字符"}]}},"./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js??ref--6-2!./node_modules/sass-loader/lib/loader.js!./app/component/comment-detail/comment-detail.scss":function(e,t,n){},"./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js??ref--6-2!./node_modules/sass-loader/lib/loader.js!./app/component/comment-item/comment-item.scss":function(e,t,n){},"./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js??ref--6-2!./node_modules/sass-loader/lib/loader.js!./app/component/pagination/pagination.scss":function(e,t,n){}}]);
//# sourceMappingURL=comment.4919a1a6efa538acd58b.js.map