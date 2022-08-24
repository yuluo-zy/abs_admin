import React, { useEffect, useMemo, useState } from "react";
import useLocale from "@/pages/product/demand/locale/useLocale";
import ProductMenu from "@/pages/product/demand/menu";

import styles from "./style/index.module.less";
import { useHistory } from "react-router-dom";
import { isArray } from "@/utils/is";
import { MenuItemProps } from "@/components/type";
import { IconCalendar, IconMindMapping, IconSubscribed } from "@arco-design/web-react/icon";
import NProgress from "nprogress";
import lazyload from "@/utils/lazyload";
import { Route, Switch } from "react-router";
import { ProductStore, setMenu } from "@/store/product";
import shallow from "zustand/shallow";
import { Button, Form, Input, Message, Select, Spin } from "@arco-design/web-react";
import DynamicRadioGroup from "@/components/Dynamic/Radio";
import axios from "axios";
import { getProjectList } from "@/api/project";
import { getMpnList } from "@/api/demand";
import DynamicOuterCard from "@/components/Dynamic/Card/outer-frame";

function getFlattenRoutes(routes) {
  const res = [];
  const mod = import.meta.glob("./entry/**/[a-z[]*.tsx");

  function travel(_routes) {
    _routes.forEach((route) => {
      if (route.key && route.path) {
        route.component = lazyload(
          mod[`./entry/${route.path}/index.tsx`]
        );
        res.push(route);
      }
      if (isArray(route.child) && route.child.length) {
        travel(route.child);
      }
    });
  }

  travel(routes);
  return res;
}

const Option = Select.Option;

export default function ProductDemand() {
  const t = useLocale();


  const MenuTree: MenuItemProps[] = [
    {
      name: t["menu.hardware.selection"],
      key: "menu.hardware.selection",
      icon: <IconMindMapping key={"menu.hardware.selection"} />,
      path: "hardware"
    },
    {
      name: t["menu.production.service.selection"],
      key: "menu.production.service.selection",
      icon: <IconSubscribed key={"menu.production.service.selection"} />,
      path: "service/preselection",
      child: [
        {
          name: t[
            "menu.production.service.selection.requirements.details.firmware"
            ],
          key: "menu.production.service.selection.requirements.details.firmware",
          path: "service/firmware",
          show: false,
          value: 0
        },
        {
          name: t[
            "menu.production.service.selection.requirements.details.mac"
            ],
          key: "menu.production.service.selection.requirements.details.mac",
          path: "service/mac",
          show: false,
          value: 1
        },
        {
          name: t[
            "menu.production.service.selection.requirements.details.burn"
            ],
          key: "menu.production.service.selection.requirements.details.burn",
          path: "service/burn",
          show: false,
          value: 2
        },
        {
          name: t[
            "menu.production.service.selection.requirements.details.pre-fit"
            ],
          key: "menu.production.service.selection.requirements.details.pre-fit",
          path: "service/pre-fit",
          show: false,
          value: 3
        },
        {
          name: t[
            "menu.production.service.selection.requirements.details.custom.label"
            ],
          key: "menu.production.service.selection.requirements.details.custom.label",
          path: "service/label",
          show: false,
          value: 4
        }
      ]
    },
    {
      name: t["menu.production.service.selection.check"],
      key: "menu.production.service.selection.check",
      icon: <IconCalendar key={"menu.production.service.selection.check"} />,
      path: "check"
    }
  ];
  const flattenRoutes = useMemo(() => getFlattenRoutes(MenuTree) || [], []);
  const history = useHistory();
  const [setStepRouter, setCollapse] = ProductStore(state => [state.setStepRouter, state.setCollapse, state.setStepList], shallow);
  const [project, setProject] = useState([]);
  const [mpnList, setMpnList] = useState([]);
  const [info, setInfo] = ProductStore(state => [state.projectData, state.setProjectInfo], shallow);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    setMenu(MenuTree);
  }, []);
  useEffect(() => {
    // 用来获取相关的固件项目信息
    setLoading(value => !value);
    axios.all([
      getProjectList(),
      getMpnList()
    ]).then(axios.spread((projectList, mpnList) => {
      if (projectList.data.success) {
        setProject(projectList.data.result);
      }
      if (mpnList.data.success) {
        setMpnList(mpnList.data.result);
      }
    }))
      .catch(() => {
          Message.error(t["message.service.notfound"]);
        }
      ).finally(() => {
      setLoading(value => !value);
    });
  }, []);

  function onClickMenuItem(key) {
    const currentRoute = flattenRoutes.find((r) => r.key === key);
    const component = currentRoute.component;
    const preload = component.preload();
    NProgress.start();
    preload.then(() => {
      setStepRouter(currentRoute.path);
      history.push(`/product/demand/${currentRoute.path}`);
      NProgress.done();
    });
  }

  const nextStep = () => {
    history.push(`/product/demand/hardware`);
  };

  const bodyStyle = {
    paddingLeft: "2rem",
    paddingRight: "0",
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
    transition: " 0.5s all ease-in-out"
  };
  return (

    <div style={bodyStyle}>
      <div className={styles.layout}>
        <div className={styles.layoutLeftSide}>
          <ProductMenu clickMenuItem={onClickMenuItem} />
        </div>
        <div className={styles["layout-content"]}>
          <Switch>
            {flattenRoutes.map((route, index) => {
              return (
                <Route
                  key={index}
                  path={`/product/demand/${route.path}`}
                  component={route.component}
                />
              );
            })}
            <Route exact path={"/product/demand"}>
              <Spin style={{ width: "100%" }} loading={loading}>
                <DynamicOuterCard title={t["menu.title"]}>
                  <Form
                    form={form}
                    scrollToFirstError
                    labelAlign="left"
                    initialValues={info}
                    labelCol={{ span: 4, offset: 0 }}
                  >
                    <Form.Item field="firmwareVersion" label={t["firmware.customization.info.version"]}

                               required={true} rules={[{
                      required: true,
                      message: t["firmware.customization.info.version.error"]
                    }]}>
                      <Input
                        style={{ width: 300 }}
                        allowClear
                        size={"large"}
                        // onChange={value => setInfo({
                        //   firmwareVersion: value
                        // })}
                        // defaultValue={info?.firmwareVersion}
                        placeholder={t["firmware.customization.info.version.hint"]}
                      />

                    </Form.Item>
                    <Form.Item field="firmwareProject" label={t["firmware.customization.info.project"]}

                               required={true} rules={[{
                      required: true,
                      message: t["firmware.customization.info.project.error"]
                    }]}>
                      <Select
                        size={"large"}
                        placeholder={t["firmware.customization.info.project.hint"]}
                        style={{ width: 300 }}
                        // defaultValue={info?.firmwareProject}
                        // onChange={(value) => setInfo({
                        //   firmwareProject: value
                        // })}
                      >
                        {project.map((option) => (
                          <Option key={option.id} value={option.name}>
                            {option.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item field="firstImport" label={t["firmware.customization.info.project.history"]}

                               required={true} rules={[{
                      required: true,
                      message: t["firmware.customization.info.project.history.error"]
                    }]}>
                      <DynamicRadioGroup
                        direction="vertical"
                        defaultValue={info?.firstImport}
                        options={[
                          { label: t["firmware.customization.info.project.history.first"], value: 1 },
                          { label: t["firmware.customization.info.project.history.next"], value: 0 }
                        ]}
                        //   onChange={(value) => {
                        //   setInfo({ firstImport: value });
                        // }}
                      />
                    </Form.Item>
                    {
                      info?.firstImport === 0 &&
                      <Form.Item field="firstImport" label={t["firmware.customization.info.project.history.old"]}

                                 required={true} rules={[{
                        required: true,
                        message: t["firmware.customization.info.version.error"]
                      }]}>
                        <Select
                          size={"large"}
                          style={{ width: 300 }}
                          placeholder={t["firmware.customization.info.project.hint"]}
                          defaultValue={
                            info?.lastMpn
                          }
                          onChange={(value) => setInfo({ lastMpn: value })}
                        >
                          {mpnList.map((option, index) => (
                            <Option key={index} value={option?.id}>
                              {option?.fwPn}
                            </Option>
                          ))}
                        </Select>

                      </Form.Item>
                    }
                  </Form>
                  <Button type="primary" onClick={nextStep}>
                    {t["index.start"]}
                  </Button>
                </DynamicOuterCard>
              </Spin>
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}
