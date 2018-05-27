(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{"./app/api/tag.js":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a,o=n("./app/redux/type.js"),r=n("./app/api/api.js"),i=(a=r)&&a.__esModule?a:{default:a};t.default=new i.default({list:{url:"/api/tag",actionType:o.LOAD_TAG_LIST},view:{url:"/api/tag/:id",actionType:o.LOAD_TAG_DETAIL},topicList:{url:"/api/tag/:id/topic",actionType:o.LOAD_TAG_TOPIC_LIST}})},"./app/component/pagination/index.jsx":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),o=n("./node_modules/react/index.js"),r=l(o),i=l(n("./node_modules/prop-types/index.js"));function l(e){return e&&e.__esModule?e:{default:e}}n("./app/component/pagination/pagination.scss");var s=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,o.PureComponent),a(t,[{key:"handleChangePage",value:function(e,t){e.preventDefault();var n=this.props.page,a=this.pageCount(),o=n+t;0===n||n>a||this.props.onChangePage(o)}},{key:"pageCount",value:function(){var e=this.props,t=e.pageSize,n=e.total,a=parseInt(n/t);return n%t==0?a:a+1}},{key:"render",value:function(){var e=this,t=this.props.page,n=this.pageCount();return r.default.createElement("nav",{className:"pager","aria-label":"Page navigation"},r.default.createElement("ul",{className:"pagination"},r.default.createElement("li",{className:"page-item "+(t<=1?"disabled":"")},r.default.createElement("a",{className:"page-link",href:"#",onClick:function(t){return e.handleChangePage(t,-1)},tabIndex:"-1"},"上一页")),r.default.createElement("li",{className:"page-item"},r.default.createElement("div",{className:"page-link"},"第 ",t," 页，共 ",n," 页")),r.default.createElement("li",{className:"page-item "+(t>=n?"disabled":"")},r.default.createElement("a",{className:"page-link",href:"#",onClick:function(t){return e.handleChangePage(t,1)}},"下一页"))))}}]),t}();s.propTypes={onChangePage:i.default.func,total:i.default.number,pageSize:i.default.number,page:i.default.number},s.defaultProps={onChangePage:function(){return null},total:0,pageSize:30,page:1},t.default=s},"./app/component/pagination/pagination.scss":function(e,t,n){var a=n("./node_modules/css-loader/index.js??ref--6-2!./node_modules/sass-loader/lib/loader.js!./app/component/pagination/pagination.scss");"string"==typeof a&&(a=[[e.i,a,""]]);var o={hmr:!0,transform:void 0};n("./node_modules/style-loader/lib/addStyles.js")(a,o);a.locals&&(e.exports=a.locals)},"./app/component/tag-item/index.jsx":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),o=n("./node_modules/react/index.js"),r=s(o),i=s(n("./node_modules/prop-types/index.js")),l=n("./node_modules/react-router-dom/es/index.js");function s(e){return e&&e.__esModule?e:{default:e}}var u=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,o.Component),a(t,[{key:"handleClick",value:function(e,t){e.stopPropagation(),e.preventDefault(),this.props.history.push("/tag/"+t.id)}},{key:"render",value:function(){var e=this,t=this.props,n=t.tag,a=t.className;return n?r.default.createElement("a",{href:"#",key:n.id,className:"badge badge-primary "+a,onClick:function(t){return e.handleClick(t,n)}},n.name," ",n.topicCount?"- "+n.topicCount:""):null}}]),t}();u.propTypes={className:i.default.string,tag:i.default.object,history:i.default.object},u.defaultProps={className:"",tag:null,history:null},t.default=(0,l.withRouter)(u)},"./app/component/topic-list/index.jsx":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),o=n("./node_modules/react/index.js"),r=c(o),i=c(n("./node_modules/prop-types/index.js")),l=c(n("./app/component/tag-item/index.jsx")),s=c(n("./app/component/pagination/index.jsx")),u=n("./app/util/index.js");function c(e){return e&&e.__esModule?e:{default:e}}n("./app/component/topic-list/topic-list.scss");var p=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,o.PureComponent),a(t,[{key:"handleClickTopicItem",value:function(e){this.props.onViewDetail(e)}},{key:"renderEmpty",value:function(e){return r.default.createElement("div",{className:"card"},r.default.createElement("div",{className:"card-body"},e))}},{key:"render",value:function(){var e=this,t=this.props,n=t.data;return t.loading&&!n?this.renderEmpty("正在加载主题列表..."):n&&0!==n.list.length?r.default.createElement("div",null,r.default.createElement("div",{className:"list-group topic-list"},n.list.map(function(t){return r.default.createElement("div",{key:t.id,className:"list-group-item list-group-item-action d-flex flex-row align-items-center",onClick:function(){return e.handleClickTopicItem(t)}},r.default.createElement("div",{className:"avatar pr-3"},r.default.createElement("img",{className:"rounded",src:t.user&&t.user.avatarURL,alt:t.user&&t.user.nickName})),r.default.createElement("div",{className:"content"},r.default.createElement("h5",{className:"mb-1 d-flex"},1===t.isSticked&&r.default.createElement("span",{className:"badge badge-success mr-2"},"置顶"),t.title),r.default.createElement("div",{className:"tags"},t.tags.map(function(e){return r.default.createElement(l.default,{key:e.id,className:"mr-1",tag:e})})),r.default.createElement("small",null,t.user&&r.default.createElement("a",{className:"mr-1",href:"user/"+t.user.id},t.user.nickName),"发布于 ",(0,u.formatDatetime)(t.createTime))))})),r.default.createElement("div",{className:"mt-3"},r.default.createElement(s.default,{page:n.page,total:n.total,pageSize:n.pageSize,onChangePage:function(t){return e.handlePageChange(t)}}))):this.renderEmpty("暂时没有主题...")}}]),t}();t.default=p,p.propTypes={data:i.default.object,loading:i.default.bool,onViewDetail:i.default.func},p.defaultProps={data:null,loading:!1,onViewDetail:function(){return null}}},"./app/component/topic-list/topic-list.scss":function(e,t,n){var a=n("./node_modules/css-loader/index.js??ref--6-2!./node_modules/sass-loader/lib/loader.js!./app/component/topic-list/topic-list.scss");"string"==typeof a&&(a=[[e.i,a,""]]);var o={hmr:!0,transform:void 0};n("./node_modules/style-loader/lib/addStyles.js")(a,o);a.locals&&(e.exports=a.locals)},"./app/container/tag.jsx":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),o=n("./node_modules/react/index.js"),r=c(o),i=n("./node_modules/react-redux/es/index.js"),l=c(n("./app/api/tag.js")),s=c(n("./app/component/topic-list/index.jsx")),u=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(n("./app/redux/action.js"));function c(e){return e&&e.__esModule?e:{default:e}}var p=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,o.PureComponent),a(t,[{key:"componentDidMount",value:function(){var e=this.tagId(),t=this.props.tag;t&&e===t.id||l.default.view({params:{id:e}},{tagId:e}),l.default.topicList({params:{id:e}},{tagId:e})}},{key:"componentDidUpdate",value:function(e,t){var n=this.tagId();e.tag&&e.tag.id!==n&&!this.props.tagLoading&&(l.default.view({params:{id:n}},{tagId:n}),l.default.topicList({params:{id:n}},{tagId:n}))}},{key:"tagId",value:function(){return parseInt(this.props.match.params.id,10)}},{key:"handelViewDetail",value:function(e){this.props.viewTopicDetail(e),this.props.history.push("/topic/"+e.id)}},{key:"handlePageChange",value:function(e){var t=this.tagId();l.default.topicList({params:{page:e,id:t}},{tagId:t})}},{key:"renderTag",value:function(){var e=this.props,t=e.tag;return e.tagLoading?"正在加载...":t?t.name:"标签不存在或者已被删除。"}},{key:"render",value:function(){var e=this,t=this.props,n=t.tagTopicList,a=t.tagTopicListLoading;return r.default.createElement("div",{className:"container mt-4"},r.default.createElement("div",{className:"row"},r.default.createElement("div",{className:"col-12"},r.default.createElement("div",{className:"card mb-3"},r.default.createElement("div",{className:"card-body"},r.default.createElement("strong",null,"标签：",this.renderTag()))),r.default.createElement(s.default,{data:n,loading:a,onViewDetail:function(t){return e.handelViewDetail(t)}}))))}}]),t}();t.default=(0,i.connect)(function(e){return e},u)(p)},"./app/redux/action.js":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.viewTopicDetail=function(e){return{type:a.VIEW_TOPIC_DETAIL,payload:e}},t.viewCommentDetail=function(e){return{type:a.VIEW_COMMENT_DETAIL,payload:e}},t.viewTagDetail=function(e){return{type:a.VIEW_TAG_DETAIL,payload:e}};var a=n("./app/redux/type.js")},"./node_modules/css-loader/index.js??ref--6-2!./node_modules/sass-loader/lib/loader.js!./app/component/pagination/pagination.scss":function(e,t,n){(e.exports=n("./node_modules/css-loader/lib/css-base.js")(!1)).push([e.i,".pager div.page-link{color:#212529}.pager div.page-link:hover{color:#212529;background-color:#fff;cursor:default}",""])},"./node_modules/css-loader/index.js??ref--6-2!./node_modules/sass-loader/lib/loader.js!./app/component/topic-list/topic-list.scss":function(e,t,n){(e.exports=n("./node_modules/css-loader/lib/css-base.js")(!1)).push([e.i,".topic-list .avatar img{width:4rem}.topic-list .list-group-item{cursor:pointer}",""])}}]);
//# sourceMappingURL=tag.83eb95022c5337d35185.js.map