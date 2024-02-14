import { getDb, putDb } from './database';
import { header } from './header';

export default class TextEditor {
  constructor() {
    const localData = localStorage.getItem('content') || ''; // Ensure localData is a string

    if (typeof CodeMirror === 'undefined') {
      throw new Error('CodeMirror is not loaded');
    }

    this.editor = CodeMirror(document.querySelector('#main'), {
      value: '',
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });

    getDb().then((data) => {
      console.info('Loaded data from IndexedDB, injecting into editor');
      const content = typeof data === 'string' ? data : ''; // Ensure data is a string
      this.editor.setValue(content || localData || header);
    }).catch((error) => {
      console.error('Error loading data from IndexedDB:', error);
    });

    this.editor.on('change', () => {
      localStorage.setItem('content', this.editor.getValue());
    });

    this.editor.on('blur', () => {
      console.log('The editor has lost focus');
      const content = localStorage.getItem('content') || '';
      putDb(content).catch((error) => {
        console.error('Error saving data to IndexedDB:', error);
      });
    });
  }
}