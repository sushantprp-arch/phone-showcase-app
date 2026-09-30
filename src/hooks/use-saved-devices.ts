import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useCallback, useState, type MouseEvent } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "@/hooks/use-auth";

/**
 * The per-user saved device list.
 *
 * Signed-out visitors get an empty list, so callers can render an unsaved
 * state and route them to sign-in on click instead of failing on write.
 */
export function useSavedDevices() {
  const saved = useQuery(api.savedDevices.listSaved);
  const toggle = useMutation(api.savedDevices.toggleSaved);
  const [pendingId, setPendingId] = useState<string | null>(null);

  const savedIds = saved ?? [];

  const toggleSaved = async (deviceId: string) => {
    setPendingId(deviceId);
    try {
      await toggle({ deviceId });
    } finally {
      setPendingId(null);
    }
  };

  return {
    savedIds,
    isLoading: saved === undefined,
    isSaved: (deviceId: string) => savedIds.includes(deviceId),
    isPending: (deviceId: string) => pendingId === deviceId,
    toggleSaved,
  };
}

/**
 * Save/unsave click handling for a single device, shared by the gallery star
 * and the labelled button inside the spec dialog.
 */
export function useSaveAction(deviceId: string) {
  const { isAuthenticated } = useAuth();
  const { isSaved, isPending, toggleSaved } = useSavedDevices();
  const navigate = useNavigate();
  const location = useLocation();

  const saved = isSaved(deviceId);
  const pending = isPending(deviceId);

  const onClick = useCallback(
    async (event: MouseEvent<HTMLButtonElement>) => {
      // Both call sites also sit inside a clickable card.
      event.preventDefault();
      event.stopPropagation();

      if (!isAuthenticated) {
        const returnTo = `${location.pathname}${location.search}`;
        navigate(`/auth?returnTo=${encodeURIComponent(returnTo)}`);
        return;
      }
      await toggleSaved(deviceId);
    },
    [deviceId, isAuthenticated, location.pathname, location.search, navigate, toggleSaved],
  );

  return { saved, pending, onClick };
}
