import React, { useState } from "react";

import { Radio, Space, Tabs } from "antd";
import TabPane from "antd/lib/tabs/TabPane";

export default function HomeMenu(props) {
  console.log("props", props);
  const [tabPosition, setTabPosition] = useState("left");
  const changeTabPosition = (e) => {
    setTabPosition(e.target.value);
  };
  return (
    <>
      <Space
        style={{
          marginBottom: 24,
        }}
      ></Space>
      <Tabs tabPosition={tabPosition}>
        <TabPane
          tab={
            <p>
              <img
                src="https://picsum.photos/100"
                className="rounded-full"
                width={50}
              />
            </p>
          }
          key="1"
        >
          Content of Tab 1
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          Content of Tab 2
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          Content of Tab 3
        </TabPane>
      </Tabs>
    </>
  );
}
