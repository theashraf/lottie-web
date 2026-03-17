import {
  extendPrototype,
} from '../../utils/functionExtensions';
import createNS from '../../utils/helpers/svg_elements';
import RenderableElement from '../helpers/RenderableElement';
import BaseElement from '../BaseElement';
import TransformElement from '../helpers/TransformElement';
import HierarchyElement from '../helpers/HierarchyElement';
import FrameElement from '../helpers/FrameElement';
import HBaseElement from './HBaseElement';
import HSolidElement from './HSolidElement';

function HImageElement(data, globalData, comp) {
  this.assetData = globalData.getAssetData(data.refId);
  var imageSid = this.assetData && this.assetData.sid ? this.assetData.sid : null;
  if (imageSid) {
    this.assetData = globalData.slotManager.getProp(this.assetData);
  }
  this.initElement(data, globalData, comp);
  if (imageSid) {
    globalData.slotManager.registerProp(imageSid, 'image', this);
  }
}

extendPrototype([BaseElement, TransformElement, HBaseElement, HSolidElement, HierarchyElement, FrameElement, RenderableElement], HImageElement);

HImageElement.prototype.createContent = function () {
  var assetPath = this.globalData.getAssetsPath(this.assetData);
  var img = new Image();

  if (this.data.hasMask) {
    this.imageElem = createNS('image');
    this.imageElem.setAttribute('width', this.assetData.w + 'px');
    this.imageElem.setAttribute('height', this.assetData.h + 'px');
    this.imageElem.setAttributeNS('http://www.w3.org/1999/xlink', 'href', assetPath);
    this.layerElement.appendChild(this.imageElem);
    this.baseElement.setAttribute('width', this.assetData.w);
    this.baseElement.setAttribute('height', this.assetData.h);
  } else {
    this.imgElem = img;
    this.layerElement.appendChild(img);
  }
  img.crossOrigin = 'anonymous';
  img.src = assetPath;
  if (this.data.ln) {
    this.baseElement.setAttribute('id', this.data.ln);
  }
};

HImageElement.prototype._updateSlotAsset = function (newAssetData) {
  Object.assign(this.assetData, newAssetData);
  var assetPath = this.globalData.getAssetsPath(this.assetData);
  if (this.imageElem) {
    this.imageElem.setAttribute('width', this.assetData.w + 'px');
    this.imageElem.setAttribute('height', this.assetData.h + 'px');
    this.imageElem.setAttributeNS('http://www.w3.org/1999/xlink', 'href', assetPath);
    this.baseElement.setAttribute('width', this.assetData.w);
    this.baseElement.setAttribute('height', this.assetData.h);
  } else if (this.imgElem) {
    this.imgElem.src = assetPath;
  }
};

export default HImageElement;
