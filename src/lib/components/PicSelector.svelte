<!-- <script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	export let profilePic: string | null = null;
	export let setProfilePic: (pic: string | null) => void;
	export let profileColor: string;

	// Import your theme context if necessary
	// Assuming you have a context or store for the theme
	import { theme } from '../Providers/ThemeProvider';

	let containerRef: HTMLDivElement;
	let imageRef: HTMLImageElement;
	let fileInputRef: HTMLInputElement;

	let defaultImage = `https://singlecolorimage.com/get/${(profileColor).slice(1)}/192x192`;

	let imagePreview: string | null = null;
	let zoom = 100;

	let isDragging = false;
	let clickForFileDialog = true;
	let imageOffset = { x: 0, y: 0 };
	let startDragPos = { x: 0, y: 0 };
	let imageStyle: Record<string, string> = {};

	// Svelte reactive statements
	$: imageStyle = {
		...imageStyle,
		transform: `scale(${zoom / 100})`,
		transformOrigin: 'top left'
	};

	// Update defaultImage when theme or profileColor changes
	$: defaultImage = `https://singlecolorimage.com/get/${(profileColor).slice(1)}/192x192`;

    function mouseDown(e: MouseEvent) {
        e.preventDefault();
        isDragging = true;
        clickForFileDialog = true;
        document.body.style.cursor = 'grabbing';

        if (!imageRef) return;

        const imageRect = imageRef.getBoundingClientRect();
        startDragPos = {
        x: e.clientX - imageRect.left,
        y: e.clientY - imageRect.top,
        };
    }

  function mouseMove(e: MouseEvent) {
    if (!isDragging || !containerRef || !imageRef) return;

    // Don't prompt file dialog if the cursor moves during click
    clickForFileDialog = false;

    const containerRect = containerRef.getBoundingClientRect();
    const imageRect = imageRef.getBoundingClientRect();

    // Get the mouse position relative to the container's top left corner
    const mouseX = e.clientX - containerRect.left;
    const mouseY = e.clientY - containerRect.top;

    // Calculate the new offset based on where the drag started
    let newX = mouseX - startDragPos.x;
    let newY = mouseY - startDragPos.y;

    // Clamp the new offset within the bounds of the container
    const maxX = containerRect.width - imageRect.width;
    const maxY = containerRect.height - imageRect.height;

    const minX = 0;
    const minY = 0;

    newX = Math.min(Math.max(newX, maxX), minX);
    newY = Math.min(Math.max(newY, maxY), minY);

    // Set the new offset
    imageOffset = { x: newX, y: newY };
  }

  function mouseUp() {
    if (clickForFileDialog && fileInputRef) {
      fileInputRef.click();
    }

    isDragging = false;
    document.body.style.cursor = '';
  }

  // Add event listeners on mount and remove on destroy
  onMount(() => {
    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseup', mouseUp);
  });

  onDestroy(() => {
    window.removeEventListener('mousemove', mouseMove);
    window.removeEventListener('mouseup', mouseUp);
  });

  function onImageLoad(e: Event) {
    const imageElement = e.target as HTMLImageElement;

    setProfilePic(imageElement.src);

    const imageRect = imageElement.getBoundingClientRect();

    if (imageRect.width > imageRect.height) {
      imageStyle = {
        width: 'auto',
        height: '100%',
      };
    } else {
      imageStyle = {
        width: '100%',
        height: 'auto',
      };
    }

    zoom = 100;
  }

  function handleZoomChange(newZoom: number) {
    if (!containerRef || !imageRef) return;

    const containerRect = containerRef.getBoundingClientRect();
    const imageRect = imageRef.getBoundingClientRect();

    // Calculate the center of the viewable area before zooming
    const viewCenterX = (-imageOffset.x + containerRect.width / 2) / (zoom / 100);
    const viewCenterY = (-imageOffset.y + containerRect.height / 2) / (zoom / 100);

    zoom = newZoom;

    const zoomFactor = newZoom / 100;
    // Calculate new offsets to keep the view centered around the same point
    let newX = -(viewCenterX * zoomFactor - containerRect.width / 2);
    let newY = -(viewCenterY * zoomFactor - containerRect.height / 2);

    const maxX = containerRect.width - imageRect.width * zoomFactor;
    const maxY = containerRect.height - imageRect.height * zoomFactor;

    const minX = 0;
    const minY = 0;

    newX = Math.min(Math.max(newX, maxX), minX);
    newY = Math.min(Math.max(newY, maxY), minY);

    imageOffset = { x: newX, y: newY };
  }

  export async function processAndCaptureImage(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      if (!containerRef || !imageRef) {
        reject(new Error('Required elements are not loaded in DOM.'));
        return;
      }

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = containerRef.offsetWidth;
      canvas.height = containerRef.offsetHeight;

      const scaleFactor = zoom / 100;

      if (ctx) {
        ctx.scale(scaleFactor, scaleFactor);

        const imageX =
          (-imageOffset.x / scaleFactor / imageRef.width) * imageRef.naturalWidth;
        const imageY =
          (-imageOffset.y / scaleFactor / imageRef.height) * imageRef.naturalHeight;
        const imageWidth = (canvas.width / imageRef.width) * imageRef.naturalWidth;
        const imageHeight = (canvas.height / imageRef.height) * imageRef.naturalHeight;

        ctx.drawImage(
          imageRef,
          imageX,
          imageY,
          imageWidth,
          imageHeight,
          0,
          0,
          canvas.width,
          canvas.height
        );
      }

      setImagePreview(null);

      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to create blob from canvas.'));
        }
      }, 'image/png');
    });
  }

  export function newImage(): boolean {
    return imagePreview !== null;
  }
</script>

<div>
    <div
      bind:this={containerRef}
      class="relative flex justify-center items-center w-48 h-48 mx-auto group cursor-pointer select-none overflow-hidden rounded-2xl"
    >
      <img
        bind:this={imageRef}
        src={imagePreview || profilePic || defaultImage}
        on:load={onImageLoad}
        on:mousedown={mouseDown}
        alt="profile pic"
        class="absolute rounded-2xl object-cover max-w-none"
        class:isDragging="cursor-grabbing"
        class:!isDragging="cursor-grab"
        style="
          {#if imageStyle.width}width: {imageStyle.width};{/if}
          {#if imageStyle.height}height: {imageStyle.height};{/if}
          transform: {imageStyle.transform};
          transform-origin: {imageStyle.transformOrigin};
          left: {imageOffset.x}px;
          top: {imageOffset.y}px;
        "
      />
      <button
        on:click={() => fileInputRef && fileInputRef.click()}
        class="w-8 h-8 absolute text-white opacity-0 transition-all rounded-2xl"
        class:!isDragging="group-hover:opacity-100">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
          </svg>
          
      </button>
    </div>
  
    {#if imagePreview}
      <div class="w-48 mx-auto select-none mt-4">
        <input
          type="range"
          min="100"
          max="200"
          bind:value={zoom}
          on:input={(e) => handleZoomChange(e.target.value)}
          class="w-full range range-xs"
        />
      </div>
    {/if}
  
    <input
      bind:this={fileInputRef}
      type="file"
      on:change={(e) => {
        const file = e.target.files?.[0];
        if (file && file.type.match('image.*')) {
          const reader = new FileReader();
          reader.onload = (e) => (imagePreview = e.target?.result as string);
          reader.readAsDataURL(file);
        }
      }}
      accept="image/*"
      class="absolute w-0 h-0 overflow-hidden"
    />
  </div> -->
