function SlotManager(animationData) {
  this.animationData = animationData;
  this._registry = {};
}
SlotManager.prototype.getProp = function (data) {
  if (this.animationData.slots
    && this.animationData.slots[data.sid]
  ) {
    return Object.assign(data, this.animationData.slots[data.sid].p);
  }
  return data;
};

SlotManager.prototype.registerProp = function (sid, type, target) {
  if (!this._registry[sid]) {
    this._registry[sid] = [];
  }
  this._registry[sid].push({ type: type, target: target });
};

SlotManager.prototype.setSlotValue = function (sid, slotObject) {
  if (this.animationData.slots) {
    this.animationData.slots[sid] = slotObject;
  }
  var entries = this._registry[sid];
  if (!entries) {
    return;
  }
  var newData = slotObject.p;
  var i;
  var len = entries.length;
  for (i = 0; i < len; i += 1) {
    if (entries[i].type === 'image') {
      entries[i].target._updateSlotAsset(newData);
    } else {
      entries[i].target._updateSlotData(newData);
    }
  }
};

SlotManager.prototype.destroy = function () {
  this._registry = {};
};

function slotFactory(animationData) {
  return new SlotManager(animationData);
}

export default slotFactory;
