import { Spin } from "antd"
import classes from "./loading-spin.module.scss"
const Loading = () => {
  return (
    <div className={classes.loading}>
      <Spin size="large" />
    </div>
  )
}

export default Loading
