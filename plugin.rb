# name: guest-gate-prasunjais
# about: Force guest users to create an account by preventing them from seeing more topics
# version: 0.2.1
# authors: Prasun Jaiswal (prasunjais@gmail.com)
# url: https://github.com/Prasunjais/discourse-guest-gate

enabled_site_setting :guest_gate_enabled

register_asset "stylesheets/guest-gate.scss"