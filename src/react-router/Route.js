import React from "react";
import matchPath from "./mathPath";
import RouterContext from "./RouterContext";

class Route extends React.Component {
  static contextType = RouterContext;

  render() {
    // 从父组件 Router 中解构
    const { history, location } = this.context;

    // const { path, component: RouteComponent } = this.props;
    const {
      component: RouteComponent,
      computedMatch,
      render,
      children,
    } = this.props;
    let match = computedMatch
      ? computedMatch
      : matchPath(location.pathname, this.props);
    // 需要渲染的袁旭
    // 组件 return 的内容不能是 undefined，可以为 null
    let renderElement = null;

    // 如果自己的路由跟父组件传递的 path 一样，则匹配
    // 目前是精确匹配，暂时用不到 extra
    // 精确匹配
    // const match = location.pathname === path;

    const routerProps = { history, location };

    if (match) {
      routerProps.match = match;

      // 渲染组件: component > render
      if (RouteComponent) {
        renderElement = <RouteComponent {...routerProps}></RouteComponent>;
      } else if (render) {
        renderElement = render(routerProps);
      } else if (children) {
        renderElement = children(routerProps);
      } else {
        renderElement = null;
      }
    } else {
      // 匹配不到的时候，也应该显示 children() 方便 NavLinkRoute 调用
      if (children) {
        renderElement = children(routerProps);
      } else {
        renderElement = null;
      }
    }
    return renderElement;
  }
}

export default Route;
