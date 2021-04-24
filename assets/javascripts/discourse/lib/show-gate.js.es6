export default function(name, opts) {
  opts = opts || {};
  const container = Discourse.__container__;

  // We use the container here because modals are like singletons
  // in Discourse. Only one can be shown with a particular state.
  const route = container.lookup('route:application');
  const modalController = route.controllerFor('modal');

  modalController.set('modalClass', 'gate');

  const controllerName = opts.admin ? `modals/${name}` : name;

  const viewClass = container.lookupFactory('view:' + name);
  const controller = container.lookup('controller:' + controllerName);
  if (viewClass) {
    route.render(name, { into: 'modal', outlet: 'modalBody' });
  } else {
    const templateName = opts.templateName || Ember.String.dasherize(name);

    const renderArgs = { into: 'modal', outlet: 'modalBody'};
    if (controller) { renderArgs.controller = controllerName; }

    if (opts.addModalBodyView) {
      renderArgs.view = 'modal-body';
    }

    const modalName = `${templateName}`;
    const fullName = opts.admin ? `admin/templates/${modalName}` : modalName;
    route.render(fullName, renderArgs);
    if (opts.title) {
      modalController.set('title', I18n.t(opts.title));
    }
  }

  if (controller) {
    controller.set('modal', modalController);
    const model = opts.model;
    if (model) { controller.set('model', model); }
    if (controller.onShow) { controller.onShow(); }
    controller.set('flashMessage', null);
  }

  return controller;
};