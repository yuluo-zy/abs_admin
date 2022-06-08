import create, { GetState, SetState } from 'zustand';
import { Recordable } from '@/components/type';
import { devtools, persist } from 'zustand/middleware';

export type StoreSlice<T extends object, E extends object = T> = (
  set: SetState<E extends T ? E : E & T>,
  get: GetState<E extends T ? E : E & T>
) => T;

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
}

export interface MacDemand {
  macData: Recordable;
}

export interface LabelDemand {
  labelData: Recordable;
}

export interface BurnDemand {
  burnData: Recordable;
}

export interface PreFitDemand {
  fitData: Recordable;
}

const createBearSlice: StoreSlice<StepSetting> = (set, get) => ({
  stepKey: '',
  stepList: [],
  stepRouter: '',
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

const createRootSlice = (set: SetState<any>, get: GetState<any>) => ({
  ...createBearSlice(set, get),
  ...createProductDemand(set, get),
  ...createFirmwareDemand(set, get),
  ...createMacDemand(set, get),
  ...createLabelDemand(set, get),
  ...createBurnDemand(set, get),
  ...createPreFitDemand(set, get),
  reset: () => {
    set({
      fitData: null,
      burnData: null,
      labelData: null,
      macData: null,
      info: null,
      serviceId: null,
      demandId: -1,
      moduleInfo: {},
      serviceType: [],
      stepKey: '',
      stepList: [],
      stepRouter: '',
      collapse: true,
    })
  },
});

export const ProductStore = create(devtools(persist(createRootSlice,
  {
    name: 'product-storage',
    getStorage: () => sessionStorage
  })));



export const ProductMenuInfo = create(() => ({
  menu: []
}));

export const setMenu = (menu) => ProductMenuInfo.setState({ menu });
