import type { Project } from '@/types';

export const OPEN_PROJECT_MODAL_EVENT = 'open-project-modal';
export const CLOSE_PROJECT_MODAL_EVENT = 'close-project-modal';
export const PROJECT_MODAL_STATE_EVENT = 'project-modal-state';

export type ProjectModalState = { open: boolean; project: Project | null };

let currentState: ProjectModalState = { open: false, project: null };

export function getProjectModalState(): ProjectModalState {
  return currentState;
}

function emitState() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent<ProjectModalState>(PROJECT_MODAL_STATE_EVENT, {
        detail: currentState,
      })
    );
  }
}

export function openProjectModal(project: Project) {
  currentState = { open: true, project };
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent<Project>(OPEN_PROJECT_MODAL_EVENT, { detail: project })
    );
  }
  emitState();
}

export function closeProjectModal() {
  currentState = { open: false, project: null };
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(CLOSE_PROJECT_MODAL_EVENT));
  }
  emitState();
}
