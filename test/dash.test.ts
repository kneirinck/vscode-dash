import * as assert from 'assert';
import { Dash, DashOption } from '../src/dash';

suite('Dash Tests', () => {
  const dashOptionExactDocsetEnabled: DashOption = { exactDocset: true };

  test('Get command with keys for macOS', () => {
    const dash = new Dash('darwin', dashOptionExactDocsetEnabled);
    const uri = dash.getCommand('size', ['css', 'less']);

    assert.equal(
      uri,
      'open -g "dash-plugin://query=size&keys=exact:css,exact:less"'
    );
  });

  test('Get command with no keys for macOS', () => {
    const dash = new Dash('darwin', dashOptionExactDocsetEnabled);
    const uri = dash.getCommand('size');

    assert.equal(uri, 'open -g "dash-plugin://query=size"');
  });

  test('Get command with keys for Windows', () => {
    const dash = new Dash('win32', dashOptionExactDocsetEnabled);
    const uri = dash.getCommand('size', ['css', 'less']);

    assert.equal(
      uri,
      'cmd.exe /c start ""  "dash-plugin://query=size&keys=exact:css,exact:less"'
    );
  });

  test('Get command with no keys for Windows', () => {
    const dash = new Dash('win32', dashOptionExactDocsetEnabled);
    const uri = dash.getCommand('size');

    assert.equal(uri, 'cmd.exe /c start ""  "dash-plugin://query=size"');
  });

  test('Get command with keys for Linux', () => {
    const dash = new Dash('linux', dashOptionExactDocsetEnabled);
    const uri = dash.getCommand('size', ['css', 'less']);

    assert.equal(
      uri,
      'zeal "dash-plugin://query=size&keys=exact:css,exact:less"'
    );
  });

  test('Get command with no keys for Linux', () => {
    const dash = new Dash('linux', dashOptionExactDocsetEnabled);
    const uri = dash.getCommand('size');

    assert.equal(uri, 'zeal "dash-plugin://query=size"');
  });

  test('Exact docset disabled', () => {
    const dashOptionExactDocsetDisabled: DashOption = { exactDocset: false };

    const dash = new Dash('darwin', dashOptionExactDocsetDisabled);
    const uri = dash.getCommand('size', ['css', 'less']);

    assert.equal(uri, 'open -g "dash-plugin://query=size&keys=css,less"');
  });

  test('Override search URI', () => {
    const dashOptionSearchUriSet: DashOption = { ...dashOptionExactDocsetEnabled, searchUri: "https://github.com/search?q=" };

    const dash = new Dash('darwin', dashOptionSearchUriSet);
    const uri = dash.getCommand('size', ['css', 'less']);

    assert.equal(uri, 'open -g "https://github.com/search?q=size&keys=exact:css,exact:less"');
  });

  test('Exclude docsets in search query', () => {
    const dashOptionExcludeDocsets: DashOption = {
      ...dashOptionExactDocsetEnabled,
      searchUri: "https://github.com/search?q=",
      searchQueryExcludeDocsets: true,
    };

    const dash = new Dash('darwin', dashOptionExcludeDocsets);
    const uri = dash.getCommand('size', ['css', 'less']);

    assert.equal(uri, 'open -g "https://github.com/search?q=size"');
  });
});
