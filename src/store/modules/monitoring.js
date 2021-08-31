import { Notification } from 'element-ui';
import { getAll as getAllIbeacon } from '@/api/ibeacon';
import { getAll as getAllTracker } from '@/api/tracker';
import { getAll as getAllStaff } from '@/api/staff';
import { getTrackerHistoryToday } from '@/api/trackerHistory';

// eslint-disable-next-line import/no-cycle
import request from '@/helpers/request';

export default {
  state: {
    ibeacons: [],
    trackers: [],
    staffs: [],
    monitoring: {},
  },
  getters: {
    ibeacons: (state) => state.ibeacons,
    trackers: (state) => state.trackers,
    staffs: (state) => state.staffs,
    // eslint-disable-next-line max-len
    monitoring: (state) => Object.keys(state.monitoring).map((trackerId) => state.monitoring[trackerId]).filter((i) => i.ibeaconId && +i.rssi !== 0),
  },
  mutations: {
    setIbeacons(state, payload) {
      state.ibeacons = payload;
    },
    setTrackers(state, payload) {
      state.trackers = payload;
    },
    setStaffs(state, payload) {
      state.staffs = payload;
    },
    setMonitoring(state, payload) {
      state.monitoring = payload;
    },
    changeLocation(state, payload) {
      if (state.monitoring[payload.trackerId]) {
        // eslint-disable-next-line max-len
        state.monitoring[payload.trackerId] = { ...state.monitoring[payload.trackerId], ...payload };
      }
    },
    deleteTracker(state, trackerId) {
      state.monitoring[trackerId].rssi = 0;
    },
  },
  actions: {
    async getIbeacons({ commit }) {
      try {
        const ibeacons = await request({
          method: 'get',
          ...getAllIbeacon(),
        });
        commit('setIbeacons', ibeacons);
        return Promise.resolve(ibeacons);
      } catch (e) {
        return Promise.reject(e.message);
      }
    },
    async getTrackers({ commit }) {
      try {
        const trackers = await request({
          method: 'get',
          ...getAllTracker(),
        });
        commit('setTrackers', trackers);
        return Promise.resolve(trackers);
      } catch (e) {
        return Promise.reject(e.message);
      }
    },
    async getStaffs({ commit }) {
      try {
        const staffs = await request({
          method: 'get',
          ...getAllStaff(),
        });
        commit('setStaffs', staffs);
        return Promise.resolve(staffs);
      } catch (e) {
        return Promise.reject(e.message);
      }
    },
    async getHistoryToday() {
      try {
        const histories = await request({
          method: 'get',
          ...getTrackerHistoryToday(),
        });
        return Promise.resolve(histories);
      } catch (e) {
        return Promise.reject(e.message);
      }
    },
    async init({ dispatch, getters, commit }) {
      try {
        await dispatch('getIbeacons');
        await dispatch('getTrackers');
        await dispatch('getStaffs');
        const historyToday = await dispatch('getHistoryToday');
        const monitoring = {};
        getters.staffs.map((staff) => {
          monitoring[staff.tracker_id] = {
            id: staff.id,
            name: staff.name,
            surname: staff.surname,
            trackerId: staff.tracker_id,
            trackerName: staff.tracker.name,
            title: staff.title.name,
            ibeaconId: null,
            ibeaconName: null,
            lastChangedTime: null,
            rssi: null,
          };
          const today = historyToday.find((i) => i.tracker_id === staff.tracker_id);
          if (today) {
            const ibeacon = getters.ibeacons.find((i) => i.id === today.ibeacon_id);
            if (ibeacon) {
              monitoring[staff.tracker_id].ibeaconId = today.ibeacon_id;
              monitoring[staff.tracker_id].ibeaconName = ibeacon.name;
              monitoring[staff.tracker_id].lastChangedTime = today.created_at;
              monitoring[staff.tracker_id].rssi = today.rssi;
            }
          }
          return staff;
        });

        commit('setMonitoring', monitoring);
        return Promise.resolve();
      } catch (e) {
        return Promise.reject(e);
      }
    },
    ibeaconConnected({ getters }, ibeaconId) {
      try {
        const ibeacon = getters.ibeacons.find((i) => i.id === ibeaconId);
        Notification.info({
          message: `${ibeacon.name} isimli ibeacon bağlandı`,
          title: 'İbeacon Hareketi',
        });
      } catch (e) {
        console.log(e);
      }
    },
    ibeaconDisconnected({ getters }, ibeaconId) {
      try {
        const ibeacon = getters.ibeacons.find((i) => i.id === ibeaconId);
        Notification.error({
          message: `${ibeacon.name} isimli ibeacon ile bağlantı kesildi`,
          title: 'İbeacon Hareketi',
        });
      } catch (e) {
        console.log(e);
      }
    },
    // payload -> {tracker_id, ibeacon_id, rssi}
    changedTrackerLocation({ getters, commit }, payload) {
      // const tracker = getters.trackers.find((i) => i.id === payload.tracker_id);
      try {
        const ibeacon = getters.ibeacons.find((i) => i.id === payload.ibeacon_id);
        const location = {
          trackerId: payload.tracker_id,
          ibeaconId: ibeacon.id,
          ibeaconName: ibeacon.name,
          lastChangedTime: new Date(),
          rssi: payload.rssi,
        };
        commit('changeLocation', location);
      } catch (e) {
        console.log(e);
      }
    },

    trackerDisconnected({ commit }, trackerId) {
      commit('deleteTracker', trackerId);
    },
  },

};
