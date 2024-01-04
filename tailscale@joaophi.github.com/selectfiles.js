#!/usr/bin/env gjs

const Gettext = imports.gettext;

imports.gi.versions.Gtk = "3.0";
const { Gtk } = imports.gi;

const _ = Gettext.gettext;

function select_files(parent_window) {
  const filechooser = new Gtk.FileChooserDialog({
    title: _("Send Files"),
    parent: parent_window,
    action: Gtk.FileChooserAction.OPEN
  });
  filechooser.add_button(_("_Send"), Gtk.ResponseType.ACCEPT);
  filechooser.add_button(_("_Cancel"), Gtk.ResponseType.CANCEL);
  filechooser.set_select_multiple(true);

  filechooser.connect("response", (self, response_id) => {
    if (response_id === Gtk.ResponseType.ACCEPT) {
      print(filechooser.get_filenames().join("\n"));
    }
    filechooser.destroy();
    Gtk.main_quit();
  });

  filechooser.show();
}

Gettext.bindtextdomain("tailscale@joaophi.github.com", "/home/txelu/code/github/tailscale-gnome-qs/tailscale@joaophi.github.com/locale");
Gettext.textdomain("tailscale@joaophi.github.com");

Gtk.init(null);

select_files(new Gtk.Window());

Gtk.main();