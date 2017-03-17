var CoreView = require('backbone/core-view');
var CustomListView = require('../../../custom-list/custom-view');
var CustomListItemView = require('../../../custom-list/custom-list-multi-item-view');
var itemListTemplate = require('../../../custom-list/custom-list-item-with-checkbox.tpl');
var template = require('./filter-list-view.tpl');
var checkAndBuildOpts = require('../../../../helpers/required-opts');

var REQUIRED_OPTS = [
  'filters'
];

module.exports = CoreView.extend({
  events: {
    'click .js-back': '_onClickBack'
  },

  initialize: function (opts) {
    checkAndBuildOpts(opts, REQUIRED_OPTS, this);

    this._initBinds();

    this._listView = new CustomListView({
      className: 'DO-Filters',
      typeLabel: 'filters',
      showSearch: false,
      collection: this._filters,
      itemTemplate: itemListTemplate,
      itemView: CustomListItemView
    });
  },

  render: function () {
    this.$el.append(template({
      headerTitle: 'Filter measurements by'
    }));

    this.$('.js-content').append(this._listView.render().$el);

    return this;
  },

  _onClickBack: function (e) {
    this.killEvent(e);
    this.trigger('back', this);
  },

  _initBinds: function () {
    this._filters.bind('change:selected', this._onSelectItem, this);
  },

  _onSelectItem: function (item) {
    this.trigger('selectItem', item, this);
  }
});