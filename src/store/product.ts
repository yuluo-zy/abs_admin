import create, { GetState, SetState } from "zustand";
import { Recordable } from "@/components/type";
import { devtools, persist } from "zustand/middleware";
import { StoreSlice } from "@/store/type";

// 项目信息设置
interface ProjectInfo {
  projectData: Recordable;
  setProjectInfo: any;
}

// 相关步骤设定
export interface StepSetting {
  stepKey: string;
  stepList: string[] | [];
  stepRouter: string;
  collapse: boolean;

  setStepKey: (value) => void,
  addStepList: (value) => void,
  setStepList: (value) => void,
  setStepRouter: (value) => void,
  setCollapse: (value) => void
}

// 需求单号内容设定
export interface ProductDemand {
  moduleInfo?: Recordable;
  demandId: number;
  serviceType: number[],
  serviceId: number
  setDemandId: (value) => void,
  setModuleInfo: (value) => void,
  setServiceType: (value) => void,
  setServiceId: (value) => void
}

export interface FirmwareDemand {
  info: Recordable;
  setInfo: (value) => void;
}

export interface MacDemand {
  macData: Recordable;
}

export interface LabelDemand {
  labelData: Recordable;
}

export interface ServiceDemand {
  serviceData: Recordable;
}

export interface BurnDemand {
  burnData: Recordable;
}

export interface PreFitDemand {
  fitData: Recordable;
}

export interface CheckDemand {
  checkData: Recordable;
}

const createProjectInfo: StoreSlice<ProjectInfo> = (set, get) => ({
  setProjectInfo: value => set((state) => ({
    projectData: {
      ...state.projectData,
      ...value
    }
  })),
  projectData: {}
});

const createBearSlice: StoreSlice<StepSetting> = (set, get) => ({
  stepKey: "",
  stepList: [],
  stepRouter: "",
  collapse: true,

  setStepKey: (value) => set(() => ({
    stepKey: value
  })),
  addStepList: (value) => set((state) => ({
    stepList: [...state.stepList, value]
  })),
  setStepList: (value) => set((state) => ({
    stepList: [...value]
  })),
  setStepRouter: value => set(() => ({ stepRouter: value })),
  setCollapse: value => set(() => ({ collapse: value }))
});

const createProductDemand: StoreSlice<ProductDemand> = (set, get) => ({
  demandId: -1,
  moduleInfo: {},
  serviceType: [],
  serviceId: null,
  setDemandId: value => set(() => ({ demandId: value })),
  setModuleInfo: value => set((state) => ({
    moduleInfo: {
      ...state.moduleInfo,
      ...value
    }
  })),
  setServiceType: value => set(() => ({ serviceType: value })),
  setServiceId: value => set(() => ({ serviceId: value }))
});

// 定制固件
const createFirmwareDemand: StoreSlice<FirmwareDemand> = (set, get) => ({
  info: null,
  setInfo: value => set((state) => ({
    info: {
      ...state.info,
      ...value
    }
  }))
});

// 定制Mac
const createMacDemand: StoreSlice<MacDemand> = (set, get) => ({
  macData: null,
  setMacData: value => set((state) => ({
    macData: {
      ...state.macData,
      ...value
    }
  }))
});

// 定制 Label
const createLabelDemand: StoreSlice<LabelDemand> = (set, get) => ({
  labelData: null,
  setLabelData: value => set((state) => ({
    labelData: {
      ...state.labelData,
      ...value
    }
  }))
});

// 定制烧录内容
const createBurnDemand: StoreSlice<BurnDemand> = (set, get) => ({
  burnData: null,
  setBurnData: value => set((state) => ({
    burnData: {
      ...state.burnData,
      ...value
    }
  }))
});

// 获得本产品提供的详情服务
const createServiceDemand: StoreSlice<ServiceDemand> = (set, get) => ({
  serviceData: null,
  setServiceData: value => set((state) => ({
    serviceData: {
      ...state.serviceData,
      ...value
    }
  }))
});

// 定制烧录内容
const createPreFitDemand: StoreSlice<PreFitDemand> = (set, get) => ({
  fitData: null,
  setFitData: value => set((state) => ({
    fitData: {
      ...state.fitData,
      ...value
    }
  }))
});
// 定制自助校验
const createCheckDemand: StoreSlice<CheckDemand> = (set, get) => ({
  checkData: null,
  setCheckData: value => set((state) => ({
    checkData: {
      ...state.checkData,
      ...value
    }
  }))
});

const createRootSlice = (set: SetState<any>, get: GetState<any>) => ({
  ...createBearSlice(set, get),
  ...createProductDemand(set, get),
  ...createFirmwareDemand(set, get),
  ...createMacDemand(set, get),
  ...createLabelDemand(set, get),
  ...createBurnDemand(set, get),
  ...createPreFitDemand(set, get),
  ...createCheckDemand(set, get),
  ...createServiceDemand(set, get),
  ...createProjectInfo(set, get),
  reset: () => {
    set({
      projectData: null,
      fitData: null,
      burnData: null,
      labelData: null,
      macData: null,
      info: null,
      serviceId: null,
      checkData: null,
      demandId: -1,
      moduleInfo: {},
      serviceType: [],
      stepKey: "",
      stepList: [],
      stepRouter: "",
      collapse: true,
      serviceData: null
    });
  }
});

export const ProductStore = create(persist(createRootSlice,
  {
    name: "product-storage",
    getStorage: () => sessionStorage
  }));


export const ProductMenuInfo = create(() => ({
  menu: []
}));

export const setMenu = (menu) => ProductMenuInfo.setState({ menu });

export const ProductDemandDescriptions = create(devtools(() => ({
  demandId: [-1],
  data: [],
  update: false
})));
export const setDemandDescriptions = (demandId, data) => ProductDemandDescriptions.setState({
  demandId,
  data
});
export const setDemandUpdate = () => ProductDemandDescriptions.setState((state) => ({
  update: !state.update
}));
