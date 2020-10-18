<template>
  <ul>
    <li v-for="path in paths.children" :key="path.id" class="row-file">
      <div class="d-flex">
        <div class="mr-auto">
          <div class="d-inline-flex">
            <input ref="checkbox-files" type="checkbox" :id="getId('checkbox', path)" :checked="path.wanted" class="mr-2" v-on:change="selectWanted($event, path)" :disabled="disableCheck(path)"/>
            <b-icon-folder-fill v-if="path.folder" class="text-warning mr-1"/>
            <b-icon-file-earmark-fill v-else class="text-success mr-1"/>
            <label class="mb-1 label-file" :for="getId('checkbox', path)" :title="path.name" v-on:click.prevent="onClickCollapse(path)">{{ path.name }}</label>
          </div>
        </div>
        <div class="ml-auto">
          <label class="container">
            <input type="checkbox" :ref="getId('radio-low', path)" :id="getId('radio-low', path)" value="-1" :checked="path.priority === -1" :disabled="disableCheck(path)" v-on:change="selectPriority(-1, path)">
            <span title="Low" class="checkmark-low checkmark"></span>
          </label>
          <label class="container">
            <input type="checkbox" :ref="getId('radio-norm', path)" title="Normal" :id="getId('radio-norm', path)" value="0" :checked="path.priority === 0" :disabled="disableCheck(path)" v-on:change="selectPriority(0, path)">
            <span title="Normal" class="checkmark-norm checkmark"></span>
          </label>
          <label class="container">
            <input type="checkbox" :ref="getId('radio-high', path)" title="High" :id="getId('radio-high', path)" value="1" :checked="path.priority === 1" :disabled="disableCheck(path)" v-on:change="selectPriority(1, path)">
            <span title="High" class="checkmark-high checkmark"></span>
          </label>
        </div>
      </div>
      <b-collapse :id="getId('collapse', path)" visible>
        <path-details-torrent-view ref="folder-files" :paths="path" :torrent_id="torrent_id" v-if="path.folder" class="pl-3"/>
      </b-collapse>
    </li>
  </ul>
</template>

<script>
import result from "@/mixins/result.mixin";
import api from "@/mixins/api.transmission.mixin";
import event from "@/constantes/event.const";
import priority from "@/constantes/priority.const";

export default {
  name: "PathDetailsTorrentView",
  mixins: [result, api],
  props: {
    paths: {},
    torrent_id: Number
  },
  methods: {
    getClassSelected(path) {
      let radioPriority = this.getId('select-priority', path);

      if (this.$refs[radioPriority]) {
        let radio = this.$refs[radioPriority][0];

        switch (parseInt(radio.value)) {
          case priority.HIGH:
            return ['priority-red'];
          case priority.NORM:
            return ['priority-green'];
          case priority.LOW:
            return ['priority-orange'];
          default:
            return ['priority-neutral']
        }
      }
    },

    getIdCheckedByFolder(path) {
      let listId;

      if (path.folder) {
        listId = [];

        if (path.folder) {
          for (const child of path.children) {
            listId = listId.concat(this.getIdCheckedByFolder(child));
          }
        } else if (!this.disableCheck(path)){
          listId.push(path.id);
        }
      } else {
        listId = [path.id];
      }

      return listId;
    },

    selectPriority(value, path) {
      if (path.folder) {
        this.$refs[this.getId('radio-low', path)][0].checked = false;
        this.$refs[this.getId('radio-norm', path)][0].checked = false;
        this.$refs[this.getId('radio-high', path)][0].checked = false;
      }

      this.api_torrent.setPriorityTorrent(this.torrent_id, this.getIdCheckedByFolder(path), value)
          .then(response => {
            this.success(response);
            this.$root.$emit(event.REFRESH_FILES);
          }).catch(this.error);
    },

    selectWanted(event, path) {
      let checked = event.target.checked;
      this.setWantedUnwantedTorrent(checked, this.getIdCheckedByFolder(path));

    },

    onClickCollapse(path) {
      if (path.folder) {
        this.$root.$emit('bv::toggle::collapse', this.getId('collapse', path));
      }
    },

    disableCheck(path) {
      return !path.folder && path.bytesCompleted === path.length;
    },

    setWantedUnwantedTorrent(checked, ids) {
      if (checked) {
        this.api_torrent.setWantedTorrent(this.torrent_id, ids)
            .then(response => {
              this.success(response);
              this.$root.$emit(event.REFRESH_FILES);
            }).catch(this.error);
      } else {
        this.api_torrent.setUnwantedTorrent(this.torrent_id, ids)
            .then(response => {
              this.success(response);
              this.$root.$emit(event.REFRESH_FILES);
            }).catch(this.error);
      }
    },

    getId(input, path) {
      return input
          .concat('-files-')
          .concat(path.id ? path.id: path.name);
    }
  }
}
</script>

<style scoped>
.row-file {
  display: contents;
}

.label-file {
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: -4px;
  overflow: hidden;
  max-width: 40vh;
  display: inline;
}

/* Radio */
.container {
  position: relative;
  user-select: none;
  padding-left: 1px;
  display: inline;
}

.container input {
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
}

.container input:disabled ~ .checkmark {
  cursor: default;
}

.checkmark {
  background-color: #eee;
  border-color: darkgrey;
  border-style: solid;
  position: absolute;
  border-radius: 50%;
  border-width: 1px;
  cursor: pointer;
  height: 13px;
  width: 13px;
  top: 2px;
  left: 0;
}

.container:hover input ~ .checkmark {
  background-color: #ccc;
}

.container:hover input:disabled ~ .checkmark {
  background-color: inherit;
}

.container:hover input:checked:disabled ~ .checkmark-norm {
  background-color: #28a745;
}

.container:hover input:checked:disabled ~ .checkmark-low {
  background-color: #ffc107;
}

.container:hover input:checked:disabled ~ .checkmark-high {
  background-color: #dc3545;
}

.container input ~ .checkmark-norm {
  border-color: #28a745;
}

.container input ~ .checkmark-low {
  border-color: #ffc107;
}

.container input ~ .checkmark-high {
  border-color: #dc3545;
}

.container input:checked ~ .checkmark-norm {
  background-color: #28a745;
  border-color: #28a745;
}

.container input:checked ~ .checkmark-low {
  background-color: #ffc107;
  border-color: #ffc107;
}

.container input:checked ~ .checkmark-high {
  background-color: #dc3545;
  border-color: #dc3545;
}

.checkmark:after {
  position: absolute;
  display: none;
  content: "";
}

.container input:checked ~ .checkmark:after {
  display: block;
}
</style>