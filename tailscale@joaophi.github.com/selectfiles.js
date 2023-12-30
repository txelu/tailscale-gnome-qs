#!/usr/bin/env gjs

imports.gi.versions.Gtk = "3.0";
const { Gtk } = imports.gi;
const Gio = imports.gi.Gio;
const GLib = imports.gi.GLib;


Gtk.init(null);

function show_message(parent_window, message_title, message_text) {
  const dialog = new Gtk.MessageDialog({
    title: message_title,
    text: message_text,
    buttons: [Gtk.ButtonsType.CLOSE],
//    parent: parent_window,
    transient_for: parent_window
  });

  dialog.connect("response", (self, response_id) => {
    dialog.destroy();

    print(message_text);

    Gtk.main_quit();
  });

  dialog.show();
}

function select_files(parent_window) {
  const filechooser = new Gtk.FileChooserNative({
    title: "Open File",
    transient_for: parent_window,
    action: Gtk.FileChooserAction.OPEN,
    accept_label: "_Open",
    cancel_label: "_Cancel"
  });
  filechooser.set_select_multiple(true);

  filechooser.connect("response", (self, response_id) => {
    if (response_id === Gtk.ResponseType.ACCEPT) {
      show_message(parent_window, 'Ficheros seleccionados', filechooser.get_filenames().join("\n"));
    }
    filechooser.destroy();
  });

  filechooser.show();
}

let win = new Gtk.Window();
select_files(null);

Gtk.main();