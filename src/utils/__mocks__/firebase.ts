export async function onUserAuthChanged(onChanged: any) {
  const subscriber = onChanged;
  return subscriber;
}

export function fetchUserSearchHistories() {
  return new Promise((resolve) => {
    process.nextTick(() => resolve());
  });
}

export function addUserSearchHistories() {
  return new Promise((resolve) => {
    process.nextTick(() => resolve());
  });
}

export function updateUserSearchHistories() {
  return new Promise((resolve) => {
    process.nextTick(() => resolve());
  });
}

export function fetchUserRssList() {
  return new Promise((resolve) => {
    process.nextTick(() => resolve());
  });
}

export function deleteUserRss(_: string) {
  return new Promise((resolve) => {
    process.nextTick(() => resolve());
  });
}

export function fetchAllRssList() {
  return new Promise((resolve) => {
    process.nextTick(() => resolve());
  });
}

export function sendAnalyticsSearch(_: string) {}
